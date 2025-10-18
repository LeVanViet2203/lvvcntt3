
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    // Hàm xử lý tìm kiếm
    function handleSearch() {
        const query = searchInput.value.trim();  // Lấy giá trị đã nhập
        if (query) {
            // Chuyển hướng sang trang kết quả tìm kiếm với từ khóa trên URL
            window.location.href = `search_results.html?query=${encodeURIComponent(query)}`;
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

    // Cập nhật số lượng sản phẩm trong giỏ hàng khi trang được tải
    updateCartCount();
    
    // Lấy tất cả các nút "Thêm vào giỏ" và thêm sự kiện click
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                name: button.dataset.name, // Tên sản phẩm
                price: parseInt(button.dataset.price), // Giá sản phẩm
                image: button.getAttribute("data-image")
            };
            addToCart(product); // Gọi hàm để thêm sản phẩm vào giỏ hàng
        });
    });
});

// Giỏ hàng logic
var cart = JSON.parse(localStorage.getItem('cart')) || []; // Lấy giỏ hàng từ localStorage

function addToCart(product) {
    // Kiểm tra xem sản phẩm đã có trong giỏ hay chưa
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1; // Tăng số lượng nếu đã có
    } else {
        cart.push({ ...product, quantity: 1 }); // Thêm sản phẩm mới
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật localStorage
    updateCartCount(); // Cập nhật số lượng sản phẩm trên biểu tượng giỏ hàng
}

// Cập nhật số lượng sản phẩm trên biểu tượng giỏ hàng
function updateCartCount() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0); // Tính tổng số lượng sản phẩm trong giỏ
    const cartBadge = document.getElementById('cartCount');
    cartBadge.textContent = cartCount; // Cập nhật số lượng sản phẩm trên biểu tượng giỏ hàng
}

const close=document.getElementById("close")
const modal_over=document.querySelector('.modal_over')
const modal_body=document.querySelector('.modal_body')
close.addEventListener('click',function(e){
    console.log(e);
    modal_over.classList.add('show')
    modal_body.classList.add('show')
})
const login=document.getElementById("login")
login.addEventListener('click',function (e) {
    
    modal_over.classList.remove('show')
    modal_body.classList.remove('show')
})

