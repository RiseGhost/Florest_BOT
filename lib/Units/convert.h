#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#define true 1
#define false 0
#define Dist 7
#define Time 4

const char* UnitsDist[Dist] = {"km","hm","dam","m","dm","cm","mm"};
const char* UnitsTime[Time] = {"milisecond","second","minute","hour"};

int FindINArray(char* string,const char** array, short arraysize){
    for (short index = 0; index < arraysize; index++){
        if (strcmp(string,array[index]) == 0)   return true;
    }
    return false;
}

int SameUnitsType(char* unit1, char* unit2){
    if (FindINArray(unit1,UnitsDist,7) && FindINArray(unit2,UnitsDist,7))       return Dist;
    else if (FindINArray(unit1,UnitsTime,4) && FindINArray(unit2,UnitsTime,4))  return Time;
    return false;
}

int indexUnits(char* units, const char** array, short arraysize){
    for (short index = 0; index < arraysize; index++){
        if (strcmp(units,array[index]) == 0)    return index;
    }
    return 0;
}

double ConvertDist(char* unit1, char*unit2, double value){
    double v = value;
	short delta = (indexUnits(unit1, UnitsDist,Dist) - indexUnits(unit2,UnitsDist,Dist));
	if (delta > 0){
		while(delta > 0){
			v = v / 10;
			delta--;
		}
	} else{
		while(delta < 0){
			v = v * 10;
			delta++;
		}
	}
    return v;
}

double ConvertTime(char* unit1,char* unit2,double value){
    double v = value;
    short delta = (indexUnits(unit1,UnitsTime,Time) - indexUnits(unit2,UnitsTime,Time));
    if (delta > 0){
        while (delta > 0){
            if (delta == 1 && (strcmp(unit1,UnitsTime[0]) == 0 || strcmp(unit2,UnitsTime[0]) == 0))
                v = v * 1000;
            else
                v = v * 60;
            delta--;
        }
    }   else{
        while (delta < 0){
            if (delta == -1 && (strcmp(unit1,UnitsTime[0]) == 0 || strcmp(unit2,UnitsTime[0]) == 0))
                v = v / 1000;
            else
                v = v / 60;
            delta++;
        }
    }
    return v;
}

char* convert(char* unit1,char* unit2,double value){
    if (SameUnitsType(unit1,unit2) == false)    return "Invalid convert";
	double v = 0;
	if (SameUnitsType(unit1,unit1) == Dist)         v = ConvertDist(unit1,unit2,value);
    else if (SameUnitsType(unit1,unit2) == Time)    v = ConvertTime(unit1,unit2,value);
	char* number = (char*) malloc(sizeof(char) * 100);
	sprintf(number,"%f",v);
	return number;
}