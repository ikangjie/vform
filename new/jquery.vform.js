/*===========================
*name->jquery.vform.js
*description->基于jQuery框架编写的表单验证
*author->https://github.com/ikangjie/
*update->20190312
===========================*/
"use strict";
(function($){
	$.fn.extend({
		isvform : function(options){
			var $this = $(this),
			    $tval = jQuery.trim($this.val()),
			    defaults = {
					maxlength : -1,//负值表示没有限制
					minlength : -1,//同上
					number : false,//必须输入数字包括小数点
					parseInt : false,//必须输入整数
					rangelength : -1,//负值表示没有限制
					email : false,//true开启,false关闭
					phone : false,//同上
					equalTo : null,//输入值必须和#.相同
					required : false,//必输字段
                    en : false,//必须输入字母
                    cn : false,//必须输入汉字
                    not : false//屏蔽某字符串
				},
				opts = $.extend(defaults, options),
				flag = new Array();

            /*最大字符长度*/
		if(opts.maxlength >= 0){
			if($tval.length <= opts.maxlength){
				flag[0] = true;
			}else{
				flag[0] = false;
			}
		}else{
			flag[0] = true;
		}

            /*最小字符长度*/
		if(opts.minlength >= 0){
			if($tval.length >= opts.minlength){
				flag[1] = true;
			}else{
				flag[1] = false;
			}
		}else{
			flag[1] = true;
		}

            /*是否为数字*/
            if(opts.number === true){
            	if(/^(-)?\d+(\.\d+)?$/.test($tval)){
            		flag[2] = true;
            	}else{
            		flag[2] = false;
            	}
            }else{
            	flag[2] = true;
            }

            /*是否为整数*/
            if(opts.parseInt === true){
            	if($tval.match("^[0-9]*[1-9][0-9]*$")){
            		flag[3] = true;
            	}else{
            		flag[3] = false;
            	}
            }else{
            	flag[3] = true;
            }

            /*输入长度必须介于min和max之间*/
            if(Object.prototype.toString.call(opts.rangelength) === '[object Array]'){
            	if(opts.rangelength.length === 2){
            		for(var i = 0;i<opts.rangelength.length;i++){
            			if(typeof parseInt(opts.rangelength[i]) != 'number'){
            				console.error('rangelength['+i+'] Not Number!');
            				return false;
            			}
            		}
            		if($tval.length >= parseInt(opts.rangelength[0]) && $tval.length <= parseInt(opts.rangelength[1])){
            			flag[4] = true;
            		}else{
            			flag[4] = false;
            		}
            	}else{
            		flag[4] = false;
            	}
            }else{
            	flag[4] = true;
            }

            /*是否是邮箱格式*/
            if(opts.email === true){
            	if(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test($tval)){
            		flag[5] = true;
            	}else{
            		flag[5] = false;
            	}
            }else{
            	flag[5] = true;
            }

            /*是否是手机号码格式*/
            if(opts.phone === true){
            	if((/^1[34578]\d{9}$/.test($tval))){
            		flag[6] = true;
            	}else{
            		flag[6] = false;
            	}
            }else{
            	flag[6] = true;
            }

            /*是否与#.值相同*/
            if(opts.equalTo != null){
            	if($tval === $(opts.equalTo).val()){
            		flag[7] = true;
            	}else{
            		flag[7] = false;
            	}
            }else{
            	flag[7] = true;
            }

            /*必输字段*/
            if(opts.required === true){
                  if($this.attr('type') == 'radio' || $this.attr('type') == 'checkbox'){
                        if($this.is(':checked')){
                           flag[8] = true;
                        }else{
                           flag[8] = false;
                        }
                  }else{
                        if(!$tval.match(/^\s*$/)){
                           flag[8] = true;
                        }else{
                           flag[8] = false;
                        }                        
                  }
            }else{
            	flag[8] = true;
            }

            /*是否为字母*/
            if(opts.en === true){
                  if(/^[A-Za-z]+$/.test($tval)){
                        flag[9] = true;
                  }else{
                        flag[9] = false;
                  }
            }else{
                  flag[9] = true;
            }

            /*是否为汉字*/
            if(opts.cn === true){
                  if(/^[\u4e00-\u9fa5]+$/.test($tval)){
                        flag[10] = true;
                  }else{
                        flag[10] = false;
                  }
            }else{
                  flag[10] = true;
            }

            /*屏蔽某些字符串*/
            if(Object.prototype.toString.call(opts.not) === '[object Array]'){
            	for(var i = opts.not.length; i--;) {
            		if($tval.indexOf( opts.not[i] ) !== -1 ) {
            			flag[11] = false;
            			break;
            		}else{
            			flag[11] = true;
            		}
            	}
            }else{
            	flag[11] = true;
            }

			return flag;
		}
	});
	$.extend({
		vform : function(element){
                  var _t = this,
                      $t = $(element);
			return {
				len : function(){
					return $t.length;
				},
				is : function(control){
					var _t = this;
					if($t.length > 1){
						var cform;
						for(var i = 0;i<$t.length;i++){
                                       cform = checkform($t.eq(i).isvform(control));
						   if(cform.length >= 0){break;}
						}
						return cform;
					}else{
						return checkform($t.isvform(control));
					}
					function checkform(arr){
						var result = new Array();
						for(var i = 0;i<arr.length;i++){
							(function(i){
								if(arr[i] === false){
									result.push(arr[i]);
								}
							})(i);
						}
						if(result.length <= 0){
							return true;
						}else{
                                          return result;
                                    }
					}
				}
			};
		}
	});
})(jQuery);