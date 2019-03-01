<template>
    <div>
        <Row>
            <Col span="1">品牌</Col>
            <Col span="23">
                <CheckboxGroup v-model="brand">
                    <Checkbox label="大众"></Checkbox>
                    <Checkbox label="奥迪"></Checkbox>
                    <Checkbox label="宝马"></Checkbox>
                    <Checkbox label="奔驰"></Checkbox>
                    <Checkbox label="标致"></Checkbox>
                    <Checkbox label="丰田"></Checkbox>
                    <Checkbox label="路虎"></Checkbox>
                    <Checkbox label="MINI"></Checkbox>
                    <Checkbox label="日产"></Checkbox>
                    <Checkbox label="特斯拉"></Checkbox>
                    <Checkbox label="五菱"></Checkbox>
                    <Checkbox label="雪佛兰"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>
        <Row>
            <Col span="1">级别</Col>
            <Col span="23">
                <CheckboxGroup v-model="type">
                    <Checkbox label="跑车"></Checkbox>
                    <Checkbox label="经济轿车"></Checkbox>
                    <Checkbox label="中档轿车"></Checkbox>
                    <Checkbox label="高档轿车"></Checkbox>
                    <Checkbox label="中型SUV"></Checkbox>
                    <Checkbox label="大型SUV"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>
        <Row>
            <Col span="1">颜色：</Col>
            <Col span="23">
                <CheckboxGroup v-model="color">
                    <Checkbox label="红"></Checkbox>
                    <Checkbox label="绿"></Checkbox>
                    <Checkbox label="黄"></Checkbox>
                    <Checkbox label="黑"></Checkbox>
                    <Checkbox label="蓝"></Checkbox>
                    <Checkbox label="白"></Checkbox>
                    <Checkbox label="灰"></Checkbox>
                    <Checkbox label="银灰"></Checkbox>
                    <Checkbox label="银"></Checkbox>
                    <Checkbox label="咖啡"></Checkbox>
                    <Checkbox label="香槟"></Checkbox>
                    <Checkbox label="橙"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>
        <Row>
            <Col span="2">环保等级：</Col>
            <Col span="22">
                <CheckboxGroup v-model="environmental">
                    <Checkbox label="国一"></Checkbox>
                    <Checkbox label="国二"></Checkbox>
                    <Checkbox label="国三"></Checkbox>
                    <Checkbox label="国四"></Checkbox>
                    <Checkbox label="国五"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>
        <Row>
            <Col span="1">变速箱</Col>
            <Col span="23">
                <CheckboxGroup v-model="gearbox">
                    <Checkbox label="自动挡"></Checkbox>
                    <Checkbox label="手动挡"></Checkbox>
                    <Checkbox label="手自一体"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>
        <Row>
            <Col span="1">价格：</Col>
            <Col span="10">
                <Slider range v-model="price" :min="0" :max="100"></Slider>
            </Col>
            <!-- offset列偏移 -->
            <Col span="12" offset="1">
                
            </Col>
        </Row>
        <Row>
            <Col span="1">公里数：</Col>
            <Col span="10">
                <Slider range v-model="km" :min="0" :max="1000000"></Slider>
            </Col>
        </Row>

        <Row>
            <Col span="1">排量：</Col>
            <Col span="23">
                <CheckboxGroup v-model="displacement">
                    <Checkbox label="1.0L"></Checkbox>
                    <Checkbox label="1.2L"></Checkbox>
                    <Checkbox label="1.6L"></Checkbox>
                    <Checkbox label="1.6T"></Checkbox>
                    <Checkbox label="2.0L"></Checkbox>
                    <Checkbox label="2.0T"></Checkbox>
                    <Checkbox label="5.0L"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>
        <Row>
            <Col span="1">燃料</Col>
            <Col span="23">
                <CheckboxGroup v-model="fuel">
                    <Checkbox label="柴油车"></Checkbox>
                    <Checkbox label="汽油车"></Checkbox>
                    <Checkbox label="纯电动"></Checkbox>
                    <Checkbox label="油电混合"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        data () {
            return {

                //v-model绑定筛选数据
                brand: [],
                color: [],
                type: [],
                environmental: [],
                gearbox: [],
                price: [0,100],
                km: [0,1000000],
                displacement: [],
                fuel: [],              
            }
        },
        watch: {
            color(v) {
                this.$store.dispatch("changeFilters",{"k":"color", v});
            },
            brand(v) {
                this.$store.dispatch("changeFilters",{"k":"brand", v});
            },
            type(v) {
                this.$store.dispatch("changeFilters",{"k":"type", v});
            },
            environmental(v) {
                this.$store.dispatch("changeFilters",{"k":"environmental", v});
            },
            gearbox(v) {
                this.$store.dispatch("changeFilters",{"k":"gearbox", v});
            },
            price(v) {
                this.$store.dispatch("changeFilters",{"k":"price", v});
            },
            km(v) {
                // console.log(v);
                this.$store.dispatch("changeFilters",{"k":"km", v});
            },
            displacement(v) {
                this.$store.dispatch("changeFilters",{"k":"displacement", v});
            },
            fuel(v) {
                this.$store.dispatch("changeFilters",{"k":"fuel", v});
            }
        }
    }
</script>

<style scoped>
    .ivu-checkbox-wrapper{
        font-size: 15px;
    }
</style>