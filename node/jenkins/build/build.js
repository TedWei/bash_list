const jenkin = require('./jenkins')

const  config ={
	 host:'jenkins.io', //jenkins hostname
	 user:'username', //zhangsan
	 password:'password', //a1234567890
	 token:"token", //yxjdsfjfhsdfsd
	 job:'jobName', //new_app

}

jenkin(config)