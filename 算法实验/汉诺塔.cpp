#include<iostream>
#include<cmath>
#include<stdio.h>
using namespace std;
 
int main()
{
    int n;
    while(~scanf("%d",&n))
        {
        long long int hannuoStep=1;
        for(int i=1;i<=n;i++)
            hannuoStep*=3;
            hannuoStep-=1;
        cout<<hannuoStep<<endl;
    }
    return 0;
}
