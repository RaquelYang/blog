(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{435:function(t,s,a){"use strict";a.r(s);var n=a(56),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"angular-命名規則與程式碼攥寫風格"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#angular-命名規則與程式碼攥寫風格"}},[t._v("#")]),t._v(" Angular 命名規則與程式碼攥寫風格")]),t._v(" "),a("h3",{attrs:{id:"命名規則"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#命名規則"}},[t._v("#")]),t._v(" 命名規則")]),t._v(" "),a("ul",[a("li",[t._v('元件(component) -> 用 "-" 分隔名稱(eq : hero-list.component.ts )')]),t._v(" "),a("li",[t._v("類 (class) -> 用大寫駝峰式規則 (eq : AppModule, LoggerService, AddressPipe, HighlightDirective)")]),t._v(" "),a("li",[t._v("函式(function) -> 用小寫駝峰式規則(eq : clickOutSide)")]),t._v(" "),a("li",[t._v('常數(constant) -> 全部大寫連接用"_" (eq : HERO_URL)')]),t._v(" "),a("li",[t._v("禁止使用 var")]),t._v(" "),a("li",[t._v("命名控制在三個單字內，常見單字可縮寫")]),t._v(" "),a("li",[t._v("接口(interface) -> 用大寫駝峰式規則 (eq : ProfileConfig)")]),t._v(" "),a("li",[t._v("接口(interface) 內的屬性 -> 用小寫駝峰式規則(eq : scheduleList: ScheduleInfo[])")])]),t._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("DashboardInfo")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  month"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  scheduleList"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" ScheduleInfo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ScheduleInfo")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  scheduleTime"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  title"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("ul",[a("li",[t._v("屬性(property)與方法(method) -> 用小寫駝峰式規則(eq : clickOutSide)")]),t._v(" "),a("li",[t._v("import 空一行來區分第三方庫導入項目")]),t._v(" "),a("li",[t._v("observable 命名方式 title$ ，最後加錢字號")]),t._v(" "),a("li",[t._v("observable 攥寫方式如下")])]),t._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n   * api 功能\n   * \n   */")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getProduct")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Observable"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("Product"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("http"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token generic-function"}},[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token generic class-name"}},[a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("Product"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")])])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("api/product")]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[a("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/29784072",target:"_blank",rel:"noopener noreferrer"}},[t._v("Angular官方代码风格指南"),a("OutboundLink")],1)])])}),[],!1,null,null,null);s.default=e.exports}}]);