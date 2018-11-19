<template>
    <div>
        <div class="container">
        <div class="row">
            <div class="col-8">
                <h1>This is My Page</h1>
                <hr>
                <router-view></router-view>
            </div>
            <div class="col-4">
                <Sidebar></Sidebar>
            </div> 
        </div>
        </div>
    </div> 
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'


export default {
    components: { Sidebar }
}
</script>
