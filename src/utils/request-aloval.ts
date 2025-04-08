import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import { getToken } from "@/utils/auth"
import { getMessage } from "@/utils/requestMessage"
import { useUserStore } from '@/store/modules/user'
import { ElMessage } from "element-plus"

const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_BASE_API,
  // 请求超时时间，单位为毫秒，默认为0，表示永不超时
  timeout: 10000,
  requestAdapter: adapterFetch(),
  // 请求拦截器
  beforeRequest(method) {
    // 假设我们需要添加token到请求头
    method.config.headers['Content-Type'] = 'application/json;charset=utf-8'
    if (getToken()) {
      method.config.headers['Authorization'] = 'Bearer ' + getToken()
    }
  },
  // 响应拦截器
  // 使用 responded 对象分别指定请求成功的拦截器和请求失败的拦截器
  responded: {
    // 请求成功的拦截器
    // 当使用 `alova/fetch` 请求适配器时，第一个参数接收Response对象
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onSuccess: async (response, method) => {
      if (response.status >= 400) {
        throw new Error(response.statusText);
      }
      const json = await response.json();

      // 获取请求code和信息
      const code = json.code || '200'
      const message = json.msg || ''
      const { type, msg } = getMessage(code, message)
      if (msg) ElMessage({ message: msg, type: type })
      if (code == '401') {
        // 登出
        return useUserStore().logout()
      } else if (code != '200') {
        return Promise.reject(new Error(msg))
      } else {
        return Promise.resolve(json)
      }

      // if (json.code !== 200) {
      //   // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
      //   throw new Error(json.message);
      // }

      // 解析的响应数据将传给method实例的transform钩子函数，这些函数将在后续讲解
      // return json.data;
    },

    // 请求失败的拦截器
    // 请求错误时将会进入该拦截器。
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onError: (err, method) => {
      ElMessage.error(err.message)
      return Promise.reject(err)
    },

    // 请求完成的拦截器
    // 当你需要在请求不论是成功、失败、还是命中缓存都需要执行的逻辑时，可以在创建alova实例时指定全局的`onComplete`拦截器，例如关闭请求 loading 状态。
    // 接收当前请求的method实例
    onComplete: async method => {
      // 处理请求完成逻辑
    }
  }
});

export default alovaInstance;