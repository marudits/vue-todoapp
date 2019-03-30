<template lang="pug">
    el-progress(:text-inside="true" :stroke-width="18" :percentage="percentage" status="success")
</template>

<script>
export default {
    name: 'ProgressBar',
    props: ['percentage']
}
</script>



