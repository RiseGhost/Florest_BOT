#include<node_api.h>
#include"convert.h"
#include<string.h>

napi_value CreateNapiDouble(napi_env env,double value){
    napi_value v;
    napi_create_double(env,value,&v);
    return v;
}

napi_value CreateNapiString(napi_env env,char* string){
    napi_value v;
    napi_create_string_utf8(env,string,strlen(string),&v);
    return v;
}

napi_value Convert(napi_env env, napi_callback_info info){
	size_t argc = 3;
    napi_value argv[3];
    napi_get_cb_info(env,info,&argc,argv,NULL,NULL);
    napi_value Units1 = argv[0];
    napi_value Units2 = argv[1];
    size_t Units1Length, Units2Length;
    napi_get_value_string_utf8(env,Units1,NULL,0,&Units1Length);
    napi_get_value_string_utf8(env,Units2,NULL,0,&Units2Length);
    char units1[Units1Length+1], units2[Units2Length+1];
    napi_get_value_string_utf8(env,Units1,units1,sizeof(units1),NULL);
    napi_get_value_string_utf8(env,Units2,units2,sizeof(units2),NULL);
    double v;
    napi_get_value_double(env,argv[2],&v);
	return CreateNapiString(env,convert(units1,units2,v));
}

napi_value init(napi_env env, napi_value exports){
	napi_value funconvert;
	napi_create_function(env,nullptr,0,Convert,nullptr,&funconvert);
	napi_set_named_property(env,exports,"converter",funconvert);
	return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME,init);