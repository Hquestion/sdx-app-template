import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import ElementUI from 'element-ui';
import Indexing from '@/components/home/indexing.vue';

Vue.use(ElementUI);

describe('Indexing.vue', () => {
    it('接收title属性，并正确渲染', () => {
        const title = '我是标题';
        const wrapper = shallowMount(Indexing, {
            propsData: { title }
        });
        expect(wrapper.find('.header').text()).toMatch(title);
    });
    it('接收列属性列表，并正确渲染', () => {
        const columns = [{
            prop: 'a',
            label: '列1'
        }, {
            prop: 'b',
            label: '列2'
        }];
        const data = [{ a: 1, b: 2 }];
        const wrapper = shallowMount(Indexing, {
            propsData: { title: 'title', tableProps: columns, tableData: data }
        });
        // 子组件单独测试，在父组件里测试属性传递正确即可
        const tableVM = wrapper.find(ElementUI.Table);
        const tableColumns = wrapper.findAll(ElementUI.TableColumn);
        expect(tableVM.vm.data).toEqual(data);
        expect(tableColumns.length).toBe(2);
    });
    it('more插槽运行正常', () => {
        const moreComponent = {
            name: 'More',
            template: '<span>MORE</span>'
        };
        const wrapper = shallowMount(Indexing, {
            slots: {
                more: moreComponent
            }
        });
        expect(wrapper.find('.header').html()).toContain('<span>MORE</span>');
    });
    it('options插槽运行正常', () => {
        const optionsComp = {
            name: 'Options',
            template: '<el-table-column prop="d" label="列3"/>'
        };
        const wrapper = shallowMount(Indexing, {
            slots: {
                options: optionsComp
            }
        });
        const tableColumnWrapper = wrapper.findAll(ElementUI.TableColumn).at(0);
        expect(tableColumnWrapper.vm.prop).toEqual('d');
        expect(tableColumnWrapper.vm.label).toEqual('列3');
    });
    it('对排序的列展示排序图标，对未排序的列不展示排序图标', () => {
        const wrapper = shallowMount(Indexing, {
            propsData: {
                sortProp: 'gpu'
            }
        });
        const vm = wrapper.vm;
        const column = { column: { property: 'quota.mem' } };
        const gpuColumn = { column: { property: 'quota.gpu' } };
        expect(vm.hightlightColumnName(column)).toBe('');
        expect(vm.hightlightColumnName(gpuColumn)).toBe('highlight');
    });
});
