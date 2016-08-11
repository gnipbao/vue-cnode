import ajax from 'superagent' //ajax 请求库
import * as actions from './actions/'
const Tool = {}

/**
 * get 请求获取数据
 * 
 * @param {String} url 请求的地址
 * @param {Object} [query={}] 发送的参数
 * @param {Function} [success=() => { }] 请求成功执行回调
 * @param {Function} [error=() => { }] 请求失败执行回调
 */
Tool.get = (url, query = {}, success = () => { }, error = () => { }) => {

    ajax('GET', url).query(query).end((err, res) => {
        if (err) {
            return error({})
        } else {
            success(res.body)
        }
    })

}

/**
 * 检测元素是否在可视区
 * 
 * @param {any} el 要检测的元素
 * @param {any} [meet={ top: 0, right: 0, bottom: 0, left: 0 }] 检测的条件
 * @returns Boolean true在可视区， false不在可视区
 */
Tool.testMeet = (el, meet = { top: 0, right: 0, bottom: 0, left: 0 }) => {
    var bcr = el.getBoundingClientRect() //取得元素在可视区的位置
    var mw = el.offsetWidth //元素自身宽度
    var mh = el.offsetHeight //元素自身的高度
    var w = window.innerWidth //视窗的宽度
    var h = window.innerHeight //视窗的高度
    var boolX = (!((bcr.right - meet.left) <= 0 && ((bcr.left + mw) - meet.left) <= 0) && !((bcr.left + meet.right) >= w && (bcr.right + meet.right) >= (mw + w))) //上下符合条件
    var boolY = (!((bcr.bottom - meet.top) <= 0 && ((bcr.top + mh) - meet.top) <= 0) && !((bcr.top + meet.bottom) >= h && (bcr.bottom + meet.bottom) >= (mh + h))) //上下符合条件
    if (el.width != 0 && el.height != 0 && boolX && boolY) {
        return true
    } else {
        return false
    }
}

/**
 * 获取标题
 * 
 * @param {Object} route
 */
Tool.getTitle = (route) => {

    if (typeof route.title == 'string') {
        return route.title
    } else if (Tool.isJson(route.title)) {
        var {query, param, data} = route.title
        if (typeof query == 'string') {
            return data[route.query[query]]
        } else if (typeof param == 'string') {
            return data[route.param[query]]
        }
    }

}

Tool.isJson = (obj) => {
    return (typeof obj === 'undefined' ? 'undefined' : typeof (obj)) == 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length //true 是 false不是
}
Tool.isArray = (arr) => {
    return Object.prototype.toString.call(arr).toLowerCase() === '[object array]' //true 是 false不是
}

export {actions}

export default Tool