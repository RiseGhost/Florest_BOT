#include<node_api.h>
#include"CloneCode.h"
#include<iostream>

//Retorna o tamanho de um napi_value que seja string:
size_t getNapiStringLen(napi_env env, napi_value str){
    size_t len;
    napi_get_value_string_utf8(env,str,NULL,0,&len);
    return len + 1;
}

napi_value CloneCode(napi_env env,napi_callback_info info){
    size_t argc = 3;
    napi_value argv[3];
    napi_get_cb_info(env,info,&argc,argv,NULL,NULL);
    napi_value Dir = argv[0];
    napi_value FileName = argv[1];
    napi_value Data = argv[2];
    size_t Dir_len = getNapiStringLen(env,Dir);
    size_t FileName_len = getNapiStringLen(env,FileName);
    size_t Data_len = getNapiStringLen(env,Data);
    char dir[Dir_len],filename[FileName_len],data[Data_len];
    napi_get_value_string_utf8(env,Dir,dir,Dir_len,NULL);
    napi_get_value_string_utf8(env,FileName,filename,FileName_len,NULL);
    napi_get_value_string_utf8(env,Data,data,Data_len,NULL);
    std::cout << "dir      -> " << dir << "\n";
    std::cout << "filename -> " << filename << "\n";
    std::cout << "data     -> " << data << "\n";
    SaveINFile(dir,filename,data);
    return NULL;
}

napi_value init(napi_env env, napi_value exports){
    napi_value func;
    napi_create_function(env,nullptr,0,CloneCode,nullptr,&func);
    napi_set_named_property(env,exports,"CloneCode",func);
    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME,init);