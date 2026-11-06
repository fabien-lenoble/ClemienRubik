<script setup lang="ts">
const images = import.meta.glob<string>(
  "/src/assets/photos/**/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP,AVIF,GIF}",
  { eager: true, as: "url" }
);

const photos = Object.entries(images)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([path, url]) => ({ path, url }));
</script>

<template>
  <div class="photos-gallery">
    <img
      v-for="(photo, index) in photos"
      :key="photo.path"
      :src="photo.url"
      :alt="`Photo ${index + 1}`"
      loading="lazy"
      decoding="async"
    />
  </div>
</template>

<style scoped lang="scss">
.photos-gallery {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  gap: 24px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
}

@media (max-width: 900px) {
  .photos-gallery {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .photos-gallery {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
    padding: 16px;
  }
}
</style>