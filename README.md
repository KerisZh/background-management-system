# 后台管理系统

本项目采用Vue3 + TypeScript + Vite等技术实现了一个管理用户的后台管理系统

## 所需配置
- Node.js(16.x及以上版本)
- 推荐使用 VS Code IDE

## 项目运行
- 使用 VS Code 打开项目，运行`npm i`安装所需依赖
- 运行`npm run dev`启动项目
- 在**bms-node-server**文件夹下，运行`node index.js`
- 浏览器打开[localhost:5173](htttp://localhost:5173/)(默认)

## 操作说明
系统分为普通用户和管理员角色，根据登录时的账号密码进行区分
![Alt](public\login.jpg#pic_center)

1. 管理员
	 账号密码均为**admin**，登录成功后界面如图所示
   ![Alt](public\userManage.jpg#pic_center)
	 列表展示所有用户信息，支持增删改查操作
	
2. 普通用户
    首次使用系统可通过登录页面中的**注册**按钮注册账号
    ![Alt](public\register.jpg#pic_center)
    注册成功即可返回登录页面登录系统，登录成功后页面如图所示
    ![Alt](public\userInfo.jpg#pic_center)
    允许用户修改个人信息，包括姓名及密码
