#include<stdio.h>
#include<stdlib.h>

int indexUnits(char* units){
	if (units[0] == 'k' && units[1] == 'm') 		return 0;
	else if (units[0] == 'h' && units[1] == 'm') 	return 1;
	else if (units[0] == 'd' && units[1] == 'a')	return 2;
	else if (units[0] == 'd' && units[1] == 'm') 	return 4;
	else if (units[0] == 'c' && units[1] == 'm')	return 5;
	else if (units[0] == 'm' && units[1] == 'm')	return 6;
	else if (units[0] == 'm')						return 3;
	else return 0;
}

double convert(char* x,char* y,double value){
	double v = value;
	short delta = (indexUnits(x) - indexUnits(y));
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
