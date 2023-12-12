<script> 
import Vertical from "./vertical";
 
export default {
    components: {
        Vertical,
    },
};
</script> 

<template>
<div>
    <Vertical>
        <slot />
    </Vertical>

</div>
</template>
