#include"expressions.hpp"
#include"calc.h"

char* CharToString(char c){
    char* str = (char*) malloc(sizeof(char) * 2);
    str[0] = c;
    str[1] = '\0';
    return str;
}

short max(short x, short y){
    return (x >= y)? x : y;
}

class Tree{
    public:
        char* exp = nullptr;
        Tree* Rigth = nullptr;
        Tree* Left = nullptr;
        Tree(const char* exp){
            short len = strlen(exp);
            this->exp = (char*) malloc(sizeof(char) * (len + 1));
            strcpy(this->exp,exp);
            this->exp[len + 1] = '\0';
            if (isNumer(this->exp,strlen(this->exp)) == false) this->ExpandTree(len);
        }

        short height(){
            if (this->isLeft() == true || this == NULL) return 0;
            else if (this->Rigth == nullptr)            return 1 + max(0,this->Left->height());
            else if (this->Left == nullptr)             return 1 + max(this->Rigth->height(),0);
            else                                        return 1 + max(this->Rigth->height(),this->Left->height());
        }

        void print(){
            for (short h = 0; h < this->height() + 1; h++){
                printCurrentNode(h);
                std::cout << "\n";
            }
        }

        void resolver(){
            if (this->Left != nullptr && isNumer(this->Left->exp,strlen(this->Left->exp)) && this->Rigth == nullptr){
                if (strcmp(this->exp,"sin") == 0 || strcmp(this->exp,"sen") == 0){
                    const string result = Sen(this->Left->exp);
                    this->refreshValue(result,strlen(result));
                } else if (strcmp(this->exp,"cos") == 0){
                    const string result = Cos(this->Left->exp);
                    this->refreshValue(result,strlen(result));
                } else if (strcmp(this->exp,"tan") == 0){
                    const string result = Tan(this->Left->exp);
                    this->refreshValue(result,strlen(result));
                }
            } else if (this->isLeft() == 0 && isNumer(this->Left->exp,strlen(this->Left->exp)) && isNumer(this->Rigth->exp,strlen(this->Rigth->exp))){
                if (strcmp(this->exp,"+") == 0){
                    const string result = Add(this->Left->exp,this->Rigth->exp);
                    this->refreshValue(result,strlen(result));
                } else if (strcmp(this->exp,"-") == 0){
                    const string result = Sub(this->Left->exp,this->Rigth->exp);
                    this->refreshValue(result,strlen(result));
                } else if (strcmp(this->exp,"*") == 0){
                    const string result = Multi(this->Left->exp,this->Rigth->exp);
                    this->refreshValue(result,strlen(result));
                } else if (strcmp(this->exp,"/") == 0){
                    const string result = Div(this->Left->exp,this->Rigth->exp);
                    this->refreshValue(result,strlen(result));
                } else if (strcmp(this->exp,"^") == 0){
                    const string result = Pow(this->Left->exp,this->Rigth->exp);
                    this->refreshValue(result,strlen(result));
                }
            } else{
                if (this->Rigth != nullptr) this->Rigth->resolver();
                if (this->Left != nullptr) this->Left->resolver();
            }
        }

    private:
        void printCurrentNode(short Heigth){
            if (Heigth == 0)
                std::cout << this->exp << "\t";
            else{
                if (this->Left != nullptr)  this->Left->printCurrentNode(Heigth-1);
                if (this->Rigth != nullptr) this->Rigth->printCurrentNode(Heigth-1);
            }
        }

        int isLeft(){
            return (this->Rigth == nullptr && this->Left == nullptr) ? 1 : 0;
        }

        //Limpa toda a memória utilizada pelos nodos filhos:
        void clean(){
            if (this->Rigth != nullptr) free(this->Rigth);
            if (this->Left != nullptr) free(this->Left);
            this->Rigth = nullptr;
            this->Left = nullptr;
        }

        //Atualizada o valor da string do nodo:
        void refreshValue(char* exp,short STRlen){
            this->exp = (char*) malloc(sizeof(char) * (STRlen + 1));
            strcpy(this->exp,exp);
            this->exp[STRlen] = '\0';
            this->clean();
        }

        void ExpandTree(short STRlen){
            char* str = this->exp;
            while (ParenticesIndex(str,STRlen).size() == STRlen - 2){
                str = StringAt(&str[1],STRlen-2);
                STRlen = strlen(str);
            }
            const char* Func = MathFunc(str,STRlen);
            if (Func != " "){
                this->exp = (char*) malloc(sizeof(char) * strlen(Func) + 1);
                strcpy(this->exp,Func);
                this->exp[strlen(Func)] = '\0';
                this->Left = new Tree(StringAt(&str[strlen(Func)+1],STRlen-strlen(Func)-2));
            }   else{
                short index = OperationIndex(str,STRlen,0);
                this->exp = (char*) malloc(sizeof(char) * 2);
                strcpy(this->exp,CharToString(str[index]));
                this->exp[1] = '\0';
                if (str[index] != '!') this->Rigth = new Tree(&str[index+1]);
                this->Left = new Tree(StringAt(str,index));
            }
        }
};