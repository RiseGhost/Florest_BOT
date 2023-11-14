#include<node_api.h>
#include"tree.hpp"
#include<string.h>

napi_value CreateNapiString(napi_env env,char* string){
    napi_value v;
    napi_create_string_utf8(env,string,strlen(string),&v);
    return v;
}

napi_value CalculatExpression(napi_env env, napi_callback_info info){
	size_t argc = 1;
    napi_value argv[1];
    napi_get_cb_info(env,info,&argc,argv,NULL,NULL);
    napi_value expression = argv[0];
    size_t expressionLength, Units2Length;
    napi_get_value_string_utf8(env,expression,NULL,0,&expressionLength);
    char exp[expressionLength+1];
    napi_get_value_string_utf8(env,expression,exp,sizeof(exp),NULL);
    if (VectorIndexOf(ParenticesIndex(exp,strlen(exp)),-1) != -1) return CreateNapiString(env,"❎\nSorry.\nError to read expression.\nInvalid parentheses.");
    Tree acacia = Tree(exp);
    short h = acacia.height();
    for (short i = 0; i <= h; i++){
        acacia.resolver();
    }
    acacia.resolver();
	return CreateNapiString(env,acacia.exp);
}     

napi_value init(napi_env env, napi_value exports){
	napi_value funcCalculatExpression;
	napi_create_function(env,nullptr,0,CalculatExpression,nullptr,&funcCalculatExpression);
	napi_set_named_property(env,exports,"CalculatExpression",funcCalculatExpression);
	return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME,init);