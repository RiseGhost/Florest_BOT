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
            this->CopyString(exp,strlen(exp));
            if (isNumer(this->exp,strlen(this->exp)) == false) this->ExpandTree(strlen(exp));
        }

        //Aredonda o valor do nodo atual a 5 casas decimais:
        void RoundValer(){
            double roundv = roundf(atof(this->exp)*100000)/100000;
            this->exp = CreateNumber(roundv);
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
                string result;
                if (strcmp(this->exp,"sin") == 0 || strcmp(this->exp,"sen") == 0)
                    result = Sen(this->Left->exp);
                else if (strcmp(this->exp,"cos") == 0)
                    result = Cos(this->Left->exp);
                else if (strcmp(this->exp,"tan") == 0)
                    result = Tan(this->Left->exp);
                else if (strcmp(this->exp,"!") == 0)
                    result = fatorial(this->Left->exp);
                else if (strcmp(this->exp,"|") == 0)
                    result = Modulo(this->Left->exp);
                this->refreshValue(result,strlen(result));
            } else if (this->isLeft() == 0 && isNumer(this->Left->exp,strlen(this->Left->exp)) && isNumer(this->Rigth->exp,strlen(this->Rigth->exp))){
                string result;
                if (strcmp(this->exp,"+") == 0)
                    result = Add(this->Left->exp,this->Rigth->exp);
                else if (strcmp(this->exp,"-") == 0)
                    result = Sub(this->Left->exp,this->Rigth->exp);
                else if (strcmp(this->exp,"*") == 0)
                    result = Multi(this->Left->exp,this->Rigth->exp);
                else if (strcmp(this->exp,"/") == 0)
                    result = Div(this->Left->exp,this->Rigth->exp);
                else if (strcmp(this->exp,"^") == 0)
                    result = Pow(this->Left->exp,this->Rigth->exp);
                this->refreshValue(result,strlen(result));
            } else{
                if (this->Rigth != nullptr) this->Rigth->resolver();
                if (this->Left != nullptr) this->Left->resolver();
            }
        }

        //Return true if tree is valid, false otherwise
        bool validated(){
            if (strcmp(this->exp,"!") == 0){
                if (atof(this->Left->exp) < 0)  return false;
            }
            if (this->Rigth != nullptr && this->Left != nullptr) return this->Rigth->validated() && this->Left->validated();
            else if (this->Rigth != nullptr) return this->Rigth->validated();
            else if (this->Left != nullptr) return this->Left->validated();
            else return true;
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

        bool isLeft(){
            return (this->Rigth == nullptr && this->Left == nullptr) ? true : false;
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
            this->CopyString(exp,STRlen);
            this->clean();
        }

        void CopyString(const char* exp, short STRlen){
            this->exp = (char*) malloc(sizeof(char) * (STRlen + 1));
            strcpy(this->exp,exp);
            this->exp[STRlen] = '\0';
        }

        //Return true if the node exp = +,-,/,*:
        bool isMathSinal(){
            if (this == nullptr)                    return false;
            else if (strcmp(this->exp,"+") == 0)    return true;
            else if (strcmp(this->exp,"-") == 0)    return true;
            else if (strcmp(this->exp,"*") == 0)    return true;
            else if (strcmp(this->exp,"/") == 0)    return true;
            else                                    return false;
        }

        void ExpandTree(short STRlen){
            char* str = this->exp;
            std::vector<short> P = ParenticesIndex(str,STRlen);
            while (P.size() == STRlen - 2 && P.size() != 0){
                str = StringAt(&str[1],STRlen-2);
                STRlen = strlen(str);
            }
            const char* Func = MathFunc(str,STRlen);
            if (isNumer(str,STRlen)){
                this->exp = str;
                return;
            }
            if (Func != " "){
                this->CopyString(Func,strlen(Func));
                if (strcmp(Func,"|") == 0) this->Left = new Tree(StringAt(&str[1],STRlen-2));
                else this->Left = new Tree(StringAt(&str[strlen(Func)+1],STRlen-strlen(Func)-2));
            }   else{
                short index = OperationIndex(str,STRlen,0);
                this->CopyString(CharToString(str[index]),1);
                if (index < 0) throw std::runtime_error("❎\nSorry.\nOperacion Invalid posicion.");
                if (str[index] != '!') this->Rigth = new Tree(&str[index+1]);
                this->Left = new Tree(StringAt(str,index));
            }
        }
};