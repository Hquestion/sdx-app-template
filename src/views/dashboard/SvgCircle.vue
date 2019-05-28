<template>
    <radial-progress-bar
        :diameter="200"
        :completed-steps="completedSteps"
        :total-steps="totalSteps"
        stopColor="#4781F8"
        startColor="#8AEBFF"
        innerStrokeColor="#ECF3FD"
        :strokeWidth="16"
    >
        <p>{{ totalSteps }}</p>
        <p>运行中任务<span>个</span></p>
    </radial-progress-bar>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress';

export default {
    data() {
        return {
            completedSteps: 3,
            totalSteps: 10
        };
    },

    components: {
        RadialProgressBar
    }
};
</script>