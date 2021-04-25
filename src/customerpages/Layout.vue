  
<template>
  <div>
    <UserHeader></UserHeader>
    <router-view></router-view>
    <CartIcon></CartIcon>
    <IndexFooter></IndexFooter>
  </div>
</template>
<script>
import UserHeader from "@/customerpages/components/UserHeader";
import IndexFooter from "@/customerpages/components/IndexFooter";
 import CartIcon from "@/customerpages/components/CartIcon";
// import Alert from "@/components/Alert";
export default {
  data() {
    return {};
  },
  components: {
    UserHeader,
     IndexFooter,
    CartIcon,
    // Alert
  }
};
</script>