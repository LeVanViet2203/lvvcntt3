// Hàm để tải dữ liệu sản phẩm từ file JSON
async function loadProducts() {
    try {
        const response = await fetch('products.json'); // Đường dẫn tới file JSON
        const products = await response.json();

        // Lấy id sản phẩm từ URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        // Tìm sản phẩm theo id
        const product = products.find(p => p.id == productId);

        if (product) {
            // Hiển thị thông tin sản phẩm lên trang
            document.getElementById('product-name').innerText = product.name;
            document.getElementById('brand').innerText = product.brand;
            document.getElementById('features').innerText = product.features;
            document.getElementById('current-price').innerText = product.currentPrice + '₫';
            document.getElementById('discount').innerText = 'Giảm ' + product.discount + '%';
            document.getElementById('original-price').innerText = product.originalPrice + '₫';
            document.getElementById('rating').innerText = product.rating + ' ★';
            document.getElementById('sold-info').innerText = product.soldInfo;
            document.getElementById('shipping-destination').innerText = product.shipping.destination;
            document.getElementById('delivery-date').innerText = product.shipping.deliveryDate;
            document.getElementById('shipping-info').innerText = product.shipping.shippingInfo;
            document.getElementById('freeship-info').innerText = product.shipping.freeshipInfo;
            document.getElementById('offer-code').innerText = product.shipping.offers.offerCode;
            document.getElementById('discount-link').innerText = product.shipping.offers.discountLink;
            document.getElementById('details-capacity').innerText = product.details.capacity;
            document.getElementById('details-brand').innerText = product.details.brand;
            document.getElementById('details-brandOrigin').innerText = product.details.brandOrigin;

            const materialList = document.getElementById('details-material');
            materialList.innerHTML = ''; // Xóa nội dung cũ
            product.details.material.forEach(material => {
                const listItem = document.createElement('li');
                listItem.innerText = material;
                materialList.appendChild(listItem);
            });

            document.getElementById('details-model').innerText = product.details.model;
            document.getElementById('details-size').innerText = product.details.size;
            document.getElementById('details-madeIn').innerText = product.details.madeIn;
            document.getElementById('details-weight').innerText = product.details.weight;
            document.getElementById('details-guarantee').innerText = product.details.guarantee;

            // Cập nhật hình ảnh
            document.getElementById('img').src = product.mainImage;
            const additionalImages = product.additionalImages;
            const anhElements = document.querySelectorAll('.anh1');
            anhElements.forEach((imgElement, index) => {
                if (additionalImages[index]) {
                    imgElement.src = additionalImages[index];
                }
            });

            // Cập nhật tổng tiền ban đầu
            updateTotal(); // Gọi hàm cập nhật tổng tiền
        }
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu sản phẩm', error);
    }
}

// Hàm để thay đổi số lượng
function changeQuantity(amount) {
    const quantityInput = document.getElementById('quantity-input');
    let quantity = parseInt(quantityInput.value) + amount;

    // Đảm bảo số lượng không âm
    if (quantity < 1) {
        quantity = 1;
    }

    quantityInput.value = quantity;
    updateTotal(); // Cập nhật tổng tiền khi số lượng thay đổi
}

// Hàm để cập nhật tổng tiền
function updateTotal() {
    const currentPrice = parseInt(document.getElementById('current-price').innerText.replace('₫', '').replace('.', '').replace(',', ''));
    const quantity = parseInt(document.getElementById('quantity-input').value);
    const totalAmount = currentPrice * quantity;
    document.querySelector('.total-amount').innerText = totalAmount.toLocaleString() + '₫'; // Định dạng số tiền
}

// Thêm vào giỏ (được gán sự kiện cho nút add-to-cart)
function addToCart() {
    // Lấy thông tin sản phẩm từ HTML
    const product = {
        id: parseInt(new URLSearchParams(window.location.search).get('id')), // Lấy id sản phẩm từ URL
        name: document.getElementById('product-name').innerText,
        image: document.getElementById('img').src,
        price: parseInt(document.getElementById('current-price').innerText.replace('₫', '').replace('.', '').replace(',', '')) || 0,
        quantity: parseInt(document.getElementById('quantity-input').value) || 1
    };

    // Lưu vào localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Thay đổi tên biến từ cartItems thành cart

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex > -1) {
        // Nếu đã tồn tại, cập nhật số lượng
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        // Nếu chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Lưu giỏ hàng với tên mới
    updateCartCount(); // Cập nhật số lượng sản phẩm trong giỏ hàng
}

// Cập nhật số lượng sản phẩm trong giỏ hàng khi trang được tải
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Thay đổi tên biến từ cartItems thành cart
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount; // Cập nhật số lượng giỏ hàng
}

// Gọi hàm loadProducts khi tải trang
window.onload = function() {
    loadProducts();
    updateCartCount(); // Cập nhật số lượng sản phẩm trong giỏ hàng

    // Gắn sự kiện click cho nút add-to-cart
    const addToCartButton = document.querySelector('.add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', addToCart); // Gắn sự kiện cho nút thêm vào giỏ
    }
};

// Thay đổi số lượng

document.addEventListener('DOMContentLoaded', function() {
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Hàm xử lý tìm kiếm
function handleSearch() {
    
    const query = searchInput.value.trim();console.log(query);  // Lấy giá trị đã nhập
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
// Hàm lấy tham số query từ URL

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
    console.log(e)
    modal_over.classList.remove('show')
    modal_body.classList.remove('show')
})
//Thanh toán
const modal_over1=document.querySelector('.modal_over1');
const close2=document.getElementById("close2");
const container=document.querySelector('.container')
const buy1=document.getElementById("muangay");
buy1.addEventListener("click",function()
{
    modal_over1.classList.remove('show');
    container.classList.remove('show');
})
close2.addEventListener('click',function(e){
    console.log(e)
    modal_over1.classList.add('show');
    container.classList.add('show');
})