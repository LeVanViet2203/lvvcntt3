// Lấy phần tử giỏ hàng và thông báo giỏ hàng trống
const productGrid = document.getElementById("products");
const emptyCartText1 = document.getElementById("emptyCartText1");
const emptyCartText2 = document.getElementById("emptyCartText2");
const emptyCartPic = document.getElementById("emptyCartPic");
const middleBox = document.querySelector(".middle-box"); // Thêm phần tử middle-box
const totalAmountBox = document.getElementById("totalAmountBox"); // Box hiển thị tổng số tiền
const totalAmount = document.getElementById("totalAmount"); // Phần tử hiển thị số tiền

// Lấy dữ liệu sản phẩm từ localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(localStorage.getItem("cart"));
// Hàm cập nhật giao diện giỏ hàng
function updateCartDisplay() {
    // Xóa nội dung hiện tại
    productGrid.innerHTML = "";

    if (cart.length === 0) {
        emptyCartPic.style.display = "block";
        emptyCartText1.style.display = "block";
        emptyCartText2.style.display = "block";  // Hiện thông báo giỏ hàng trống
        totalAmountBox.style.display = "none"; // Ẩn box tổng số tiền

        // Ẩn box giới thiệu
        document.getElementById("productInfoBox").style.display = "none"; 

    } else {
        emptyCartPic.style.display = "none";
        emptyCartText1.style.display = "none";
        emptyCartText2.style.display = "none";
        totalAmountBox.style.display = "block"; // Hiển thị box tổng số tiền

        // Hiển thị box giới thiệu khi có sản phẩm
        document.getElementById("productInfoBox").style.display = "block"; 

        // Đặt lại padding và margin khi có sản phẩm
        middleBox.style.padding = ""; // Trả lại giá trị mặc định
        middleBox.style.margin = ""; // Trả lại giá trị mặc định

        cart.forEach((product, index) => {
            // Tạo thẻ sản phẩm và thêm vào productGrid
            const productCard = document.createElement("div");
            productCard.className = "cart-card";
            // Lấy tên, giá và ảnh chính từ sản phẩm
            const productName = product.name;
            const productPrice = product.price; // Lấy giá
            const productImage = product.image; // Lấy hình ảnh
            const productQuantity = product.quantity || 1; // Lấy số lượng, mặc định là 1 nếu không có
           console.log(productImage)
            // Hiển thị thông tin sản phẩm
            productCard.innerHTML = `
                <div class="intro-card">
                    <div class="intro">
                        <img src="${productImage}" alt="${productName}" style="width: 100px; height: auto;">
                        <div>
                            <div>${productName}</div>
                            <p>Ngẫu nhiên</p>
                            <div style="display: flex; align-items: center;">
                                <img src="../images/oto.png" alt="Giao thứ 5" style="width: 30px; height: auto; margin-right: 5px; margin-bottom: 15px"> <!-- Ảnh mới ở đây -->
                                <p>Giao thứ 5, 30/12</p>
                            </div>
                        </div>
                    </div>
                    <div class="cart-price">${productPrice.toLocaleString()} đ</div>
                    <div class="total">
                        <button class="quantity-button" onclick="changeQuantity(${index}, -1)">-</button>
                        <span id="quantity-${index}">${productQuantity}</span>
                        <button class="quantity-button" onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                    <div class="cart-price">${(productPrice * productQuantity).toLocaleString()} đ</div>
                </div>
            `;

            // Tạo nút "Xóa" dưới dạng hình ảnh
            const deleteButton = document.createElement("img");
            deleteButton.src = "../images/nutxoa.svg"; // Đường dẫn tới hình ảnh nút xóa
            deleteButton.style.cursor = "pointer"; // Thay đổi con trỏ khi hover
            deleteButton.classList.add("delete-button");
            deleteButton.onclick = function() {
                deleteProduct(index);
            };

            // Thêm nút "Xóa" vào thẻ sản phẩm
            productCard.appendChild(deleteButton);
            productGrid.appendChild(productCard);
        });
        
        calculateTotalAmount(); // Tính tổng số tiền
    }
}

// Hàm tính tổng số tiền
function calculateTotalAmount() {
    const temporaryTotal = cart.reduce((sum, product) => {
        return sum + (product.price * (product.quantity || 1));
    }, 0);
    
    const discount = 0.1; // Ví dụ: Giảm giá 10%
    const total = temporaryTotal * (1 - discount); // Tính tổng số tiền sau giảm giá

    document.getElementById("temporaryTotalAmount").textContent = temporaryTotal.toLocaleString(); // Cập nhật tạm tính
    totalAmount.textContent = total.toLocaleString(); // Cập nhật tổng số tiền
}


// Hàm xóa sản phẩm
function deleteProduct(index) {
    cart.splice(index, 1);  // Xóa sản phẩm khỏi mảng cart
    localStorage.setItem("cart", JSON.stringify(cart));  // Cập nhật lại localStorage
    updateCartDisplay();  // Cập nhật lại giao diện
}

// Hàm thay đổi số lượng sản phẩm
function changeQuantity(index, amount) {
    cart[index].quantity = (cart[index].quantity || 1) + amount; // Cập nhật số lượng
    if (cart[index].quantity <= 0) {
        deleteProduct(index); // Xóa sản phẩm nếu số lượng <= 0
    } else {
        localStorage.setItem("cart", JSON.stringify(cart)); // Cập nhật lại localStorage
        updateCartDisplay(); // Cập nhật lại giao diện
    }
}

function purchase() {
    // Xử lý logic mua hàng tại đây
    alert("Cảm ơn bạn đã mua hàng!");
}
updateCartDisplay()

// Giỏ hàng logic


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
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    // Hàm xử lý tìm kiếm
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

