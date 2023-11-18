#include<stdio.h>
#include<math.h>
#include<stdlib.h>
#include<string.h>
#define NumberSize 60

typedef char* string;

const string CreateNumber(double value){
    string result = (string) malloc(sizeof(char) * NumberSize);
    sprintf(result,"%f",value);
    return result;
}

double Fatorial(double value){
    return (value == 0) ? 1 : value * Fatorial(value-1);
}

const string Add(const string x,const string y){
    return CreateNumber(atof(x) + atof(y));
}

const string Sub(const string x, const string y){
    return CreateNumber(atof(x) - atof(y));
}

const string Multi(const string x, const string y){
    return CreateNumber(atof(x) * atof(y));
}

const string Div(const string x, const string y){
    return CreateNumber(atof(x)/atof(y));
}

const string Sen(const string v){
   return CreateNumber(sin(atof(v)));
}

const string Cos(const string v){
    return CreateNumber(cos(atof(v)));
}

const string Tan(const string v){
    return CreateNumber(tan(atof(v)));
}

const string Pow(const string base, const string expoent){
    return CreateNumber(pow(atof(base),atof(expoent)));
}

const string fatorial(const string v){
    return CreateNumber(Fatorial(atof(v)));
}

const string Modulo(const string v){
    return (atof(v) >= 0) ? CreateNumber(atof(v)) : CreateNumber(-atof(v));
}