#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<vector>
#include<iostream>
#define true 1
#define false 0

const char operations[6] = {'+','-','*','/','^','!'};
const char* MFuncs[10] = {"sen","sin","cos","tan","arcsen","arcsin","arcos","arctan","||","ln"};

char Sinal(const char s1, const char s2){
    if (s1 == s2)   return s1;
    else if (s1 == '+' || s1 == '-')    return s1;
    else if (s2 == '+' || s2 == '-')    return s2;
    else if (s1 == '*' || s1 == '/')    return s1;
    else if (s2 == '*' || s2 == '/')    return s2;
    else if (s1 == '^' || s2 == '^')    return '^';
    else                                return '!';
}

int isNumer(const char* number, short strlen){
    if (strlen == 0)        return false;
    if (number[0] == '-')   return isNumer(&number[1],strlen-1);
    for (short index = 0; index < strlen; index++){
        if ((number[index] < '0' || number[index] > '9') && (number[index] != '.'))   return false;
    }
    return true;
}

char* StringAt(const char* string, short index){
    char* str = (char*) malloc(sizeof(char) * index+1);
    for (short i = 0; i < index; i++)
        str[i] = string[i];
    str[index] = '\0';
    return str;
}

int FindONArray(const char c, const char* array, short arraysize){
    for (short index = 0; index < arraysize; index++){
        if (c == array[index])  return true;
    }
    return false;
}

int VectorIndexOf(std::vector<short> vec, short element){
    for (short index = 0; index < vec.size(); index++){
        if (vec[index] == element) return index;
    }
    return -1;
}

//In case of error push -1 in vector
std::vector<short> ParenticesIndex(const char* exp, short strlen){
    std::vector<short> indexs;
    short Parentices = 0;
    for (short i = 0; i < strlen; i++){
        if (exp[i] == ')')  Parentices--;
        if (Parentices > 0) indexs.push_back(i);
        if (exp[i] == '(')  Parentices++;
        if (Parentices < 0) indexs.push_back(-1);
    }
    if (Parentices != 0)    indexs.push_back(-1);
    return indexs;
}

const char* MathFunc(const char* exp, short STRlen){
    std::vector<short> Parentices = ParenticesIndex(exp, STRlen);
    if (STRlen < 4) return " ";
    else{
        if (Parentices.size() > 0 && Parentices[Parentices.size()-1] == STRlen - 2){
            const char* part1 = StringAt(exp,Parentices[0]-1);
            for (short index = 0; index < 10; index++){
                if (strcmp(part1,MFuncs[index]) == 0)   return MFuncs[index];
            }
            return " ";
        } if (exp[0] == '|' && exp[STRlen-1] == '|')    return "||";
        else      return " ";
    }
}

short OperationIndex(const char* exp, short STRlen, short delta){
    std::vector<short> ParenticesInternal = ParenticesIndex(exp,STRlen);
    char sinal = ' ';
    short i = 0;
    for(short index = STRlen; index >= 0; index--){
        if (VectorIndexOf(ParenticesInternal,index) == -1){
            if (FindONArray(exp[index],operations,6)){
                if (sinal == ' '){
                    sinal = exp[index];
                    i = delta + index;
                } else{
                    if (sinal != Sinal(sinal,exp[index])){
                        i = delta + index;
                        sinal = Sinal(sinal,exp[index]);
                    }
                }
            }
        }
    }
    return i;
}

char TypeOperations(const char* exp, short strlen){
    return exp[OperationIndex(exp,strlen,0)];
}