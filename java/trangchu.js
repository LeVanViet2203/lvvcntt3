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

//count down
const ful = new Date("november 23, 2024 23:00:00").getTime();
setInterval(function() {
    var noW = new Date().getTime();
    var D = ful - noW;

    if (D > 0) {  // Chỉ thực hiện nếu còn thời gian
        var days = Math.floor(D / (1000 * 60 * 60 * 24));
        var h = Math.floor((D % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var m = Math.floor((D % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((D % (1000 * 60)) / 1000);

        // Hiển thị kết quả
        document.getElementById("h").innerText = (days * 24 + h).toString().padStart(2, '0'); // Tổng số giờ
        document.getElementById("m").innerText = m.toString().padStart(2, '0');
        document.getElementById("s").innerText = s.toString().padStart(2, '0');
    } else {
        // Khi hết thời gian
        document.getElementById("h").innerText = "00";
        document.getElementById("m").innerText = "00";
        document.getElementById("s").innerText = "00";
    }
}, 100);
// slide hang so1
const left = document.querySelector('.fa-chevron-left'); // Chọn nút quay trái
const right = document.querySelector('.fa-chevron-right'); // Chọn nút quay phải
const slides = document.querySelectorAll('.product-grid'); // Chọn tất cả các slide
let index = 0; // Khởi tạo index

right.addEventListener('click', function(e) {
    index = index + 1;
    if (index > slides.length - 4) {
        index = 0; // Nếu vượt quá số lượng slide, quay lại slide đầu tiên
    }
    document.querySelector('.slide_1').style.transform = `translateX(-${index * 100}%)`; // Di chuyển các slide
});

left.addEventListener('click', function(e) {
    index = index - 1;
    if (index < 0) { 
        index = slides.length - 4; // Nếu nhỏ hơn 0, quay về slide cuối
    }
    document.querySelector('.slide_1').style.transform = `translateX(-${index * 100}%)`; // Di chuyển các slide
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
