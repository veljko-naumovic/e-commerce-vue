<template>
    <div class="skeleton-card">
        <div class="image"></div>
        <div class="line"></div>
        <div class="line short"></div>
    </div>
</template>

<style scoped lang="scss">
.skeleton-card {
    flex: 1 1 260px;
    min-width: 260px;
    max-width: 300px;

    padding: 16px;
    border-radius: 12px;
    background: white;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
}

.image {
    height: 200px;
    border-radius: 8px;
    margin-bottom: 16px;
    background: linear-gradient(90deg,
            #eee 25%,
            #ddd 50%,
            #eee 75%);
    background-size: 200% 100%;
    animation: shimmer 1.2s infinite;
}

.line {
    height: 14px;
    border-radius: 6px;
    margin-bottom: 10px;
    background: linear-gradient(90deg,
            #eee 25%,
            #ddd 50%,
            #eee 75%);
    background-size: 200% 100%;
    animation: shimmer 1.2s infinite;
}

.line.short {
    width: 60%;
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