<template>
  <div class="container my-5">
    <h2 class="text-center mb-4">รายการสินค้า</h2>
    <div class="row">
      <div class="col-md-4" v-for="product in products" :key="product.id">
        <div class="card shadow-sm mb-4">
          <img :src="product.image" class="card-img-top" :alt="product.name">
          <div class="card-body text-center">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.price }} บาท</p>
            <button class="btn btn-primary">รายละเอียด</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowProduct",
  data() {
    return {
      products: [
        { id: 1, name: "เตาไฟฟ้า", price: 1200, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwaT_gNNgPvXQPUszhjyGnp6x5SrTIyGM4gg&s" },
        { id: 2, name: "หม้อชาบู", price: 800, image: "https://backend.sinthanee.com/uploads/products/NewFolder/33.png" },
        { id: 3, name: "ชุดช้อนส้อม", price: 250, image: "https://www.verasu.com/media/catalog/product/cache/9fe915041f3f0fb5ee2faedd41ee1b2f/a/m/ame-austin24_01_02.jpg" },
        { id: 1, name: "เตียงนอน", price: 5000, image: "https://assets.mattresscity.co.th/media/images/e0f8212d-c573-4cda-8b5a-53199ac16309/cristalgrey.jpg" },
        { id: 2, name: "พัดลม", price: 800, image: "https://kashiwa.co.th/wp-content/uploads/2025/03/FS-2201.webp" },
        { id: 3, name: "ตู้เสื้อผ้า", price: 2500, image: "https://www.iconic-office.com/wp-content/uploads/2017/12/GreyBG-WS-C2-2.png" }
      ]
    }
  }
}
</script>
