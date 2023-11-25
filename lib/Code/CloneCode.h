#include<fcntl.h>
#include<unistd.h>
#include<string.h>
#include<sys/stat.h>
#include<stdio.h>
#include <stdlib.h>

void CreateDiretory(const char* dir){
    char command[100];
    sprintf(command,"sudo mkdir %s",dir);
    system(command);
}

void CreateFile(const char* FileName){
    char command[150];
    sprintf(command,"sudo touch %s && sudo chmod ugo=xrw %s",FileName,FileName);
    system(command);
}

void SaveINFile(const char* dir,const char* FileName,const char* data){
    CreateDiretory(dir);
    CreateFile(FileName);
    int file = open(FileName,O_RDWR); //Open the file
    write(file,data,strlen(data)); //Copy the data to new file
    close(file); //Close file
}