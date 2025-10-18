// Hàm lấy tham số query từ URL
function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Hàm chuyển đổi không dấu
function removeVietnameseDiacritics(str) {
    const vietnameseChars = 'áàảãạâấầẩẫậăắằẳẵặêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ';
    const noDiacritics = 'aaaaaaaaaaaaaaaaaaeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd';

    let result = '';
    for (let i = 0; i < str.length; i++) {
        const index = vietnameseChars.indexOf(str[i]);
        result += index !== -1 ? noDiacritics[index] : str[i];
    }
    return result;
}

// Hàm định dạng giá, thêm dấu chấm mỗi 3 chữ số
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Lấy từ khóa tìm kiếm từ URL
const query = getQueryParameter('query');
document.getElementById('searchQuery').textContent = query;

// Chuyển đổi từ khóa tìm kiếm thành không dấu
const normalizedQuery = removeVietnameseDiacritics(query.toLowerCase());

// Lấy dữ liệu từ file JSON
fetch('../html/products.json')
    .then(response => response.json()) // Chuyển dữ liệu thành JSON
    .then(products => {
        // Lọc sản phẩm dựa trên từ khóa tìm kiếm
        const filteredProducts = products.filter(product => 
            removeVietnameseDiacritics(product.name.toLowerCase()).includes(normalizedQuery)
        );
        updateCartCount()
        // Hiển thị kết quả tìm kiếm
        const searchResults = document.getElementById('searchResults');
        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                            <a href="sanpham.html?id=${product.id}">
                                <img class="hinhmathang" src="${product.mainImage}" alt="${product.name}">
                                <img class="vienanh" src="../images/vienanh.png" alt="">
                                <div class="thongtin">
                                    ${product.name} <br>
                                    <span class="gia" >${formatPrice(product.currentPrice)}</span>
                                <img class="sao" src="../images/ngoisao.png" alt="">
                                </div>
                            </a>        
                            <div class="shop">
                                <div class="muangay">
                                    <button>Mua Ngay</button>
                                </div>
                                <div class="button-container">
                                  <button class="add-to-cart" data-name="${product.name}" data-price="${product.currentPrice}" data-image="${product.mainImage}">Thêm vào giỏ</button>  
                                </div>
                            </div>
                            <div class="endproduct-card">
                                <div class="now"><img src="../images/now.png" alt=""></div>
                                <div class="speed">Giao hàng siêu tốc</div>
                            </div>
                `;
                searchResults.appendChild(productCard);
            });

            // Thêm sự kiện "Thêm vào giỏ" cho các nút sau khi sản phẩm đã được tạo
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', () => {
                    const product = {
                        name: button.dataset.name,
                        price: parseInt(button.dataset.price),
                        image: button.dataset.image
                    };
                    addToCart(product); // Gọi hàm addToCart
                });
            });
        } else {
            searchResults.innerHTML = '<p class="no-results">Không có sản phẩm nào khớp với từ khóa tìm kiếm.</p>';
        }
    })
    .catch(error => {
        console.error('Lỗi khi tải dữ liệu:', error);
    });

// Hàm thêm sản phẩm vào giỏ hàng (giống hàm trong script.js)
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1; // Tăng số lượng nếu đã có
    } else {
        cart.push({ ...product, quantity: 1 }); // Thêm sản phẩm mới
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật localStorage
    updateCartCount(); // Cập nhật số lượng sản phẩm trên biểu tượng giỏ hàng
}

// Hàm cập nhật số lượng sản phẩm trên biểu tượng giỏ hàng (giống hàm trong script.js)
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadge = document.getElementById('cartCount');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
    }
}
// Hàm xử lý tìm kiếm
    document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    
    function handleSearch() {
        const query = searchInput.value.trim();  // Lấy giá trị đã nhập
        if (query) {
            // Chuyển hướng sang trang kết quả tìm kiếm với từ khóa trên URL
            window.location.href = `ketquatimkiem.html?query=${encodeURIComponent(query)}`;
        }
    }

    // Xử lý khi nhấn nút "Tìm kiếm"
    searchButton.addEventListener('click', handleSearch);

    // Xử lý khi nhấn Enter trong thanh tìm kiếm
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();  // Ngăn chặn hành động mặc định (nếu có)
            handleSearch();
        }
    });

});
// Tap đăng nhập
const close=document.getElementById("close")
const modal_over=document.querySelector('.modal_over')
const modal_body=document.querySelector('.modal_body')
close.addEventListener('click',function(e){
    modal_over.classList.add('show')
    modal_body.classList.add('show')
})
const login=document.getElementById("login")
login.addEventListener('click',function (e) {
    
    modal_over.classList.remove('show')
    modal_body.classList.remove('show')
})