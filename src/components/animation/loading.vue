<template>
    <div class="spinner">
        <div
            class="rect1"
            :style="{'backgroundColor':color}"
        />
        <div
            class="rect2"
            :style="{'backgroundColor':color}"
        />
        <div
            class="rect3"
            :style="{'backgroundColor':color}"
        />
        <div
            class="rect4"
            :style="{'backgroundColor':color}"
        />
        <div
            class="rect5"
            :style="{'backgroundColor':color}"
        />
    </div>
</template>
<script>
export default {
    props: {
        color: {
            type: String,
            default: '#00a4ee'
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.spinner {
    margin: 20px auto;
    width: 50px;
    height: 60px;
    text-align: center;
    font-size: 10px;
}

.spinner > div {
    /*background-color: #67CF22;*/
    height: 100%;
    width: 6px;
    display: inline-block;
    margin-left: 5px;

    animation: stretchdelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
    animation-delay: -1.1s;
}

.spinner .rect3 {
    animation-delay: -1s;
}

.spinner .rect4 {
    animation-delay: -0.9s;
}

.spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}

@keyframes stretchdelay {
    0%,
    40%,
    100% {
        transform: scaleY(0.4);
    }
    20% {
        transform: scaleY(1);
    }
}
</style>
