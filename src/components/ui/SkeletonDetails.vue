<template>
    <div class="details-skeleton">
        <div class="image"></div>

        <div class="info">
            <div class="line large"></div>
            <div class="line"></div>
            <div class="line short"></div>
            <div class="line button"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.details-skeleton {
    display: flex;
    gap: 40px;
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;
}

.image {
    width: 400px;
    height: 400px;
    border-radius: 12px;
    background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
    background-size: 200% 100%;
    animation: shimmer 1.2s infinite;
}

.info {
    flex: 1;
}

.line {
    height: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
    background-size: 200% 100%;
    animation: shimmer 1.2s infinite;
}

.large {
    height: 28px;
    width: 60%;
}

.short {
    width: 40%;
}

.button {
    width: 160px;
    height: 40px;
    border-radius: 8px;
}

@keyframes shimmer {
    from {
        background-position: 200% 0;
    }

    to {
        background-position: -200% 0;
    }
}
</style>