#include<bits/stdc++.h>
using namespace std;
int n,q,p,sub,a[1000005],f[1000005];
int main()
{
	cin>>p>>q>>n;
	//其中P表示黑熊的初始能量，Q表示黑熊每次起跳时耗费的能量。
	for(int i=1;i<=n;i++)
		cin>>a[i];
	f[0]=p;//初始能量
	for(int i=1;i<=n+1;i++)
	{
		sub=max(f[i-1],f[i-2]);//前两个，注:每次最多跳2格 
		if(sub>=q) f[i]=sub-q+a[i];//剩余能量  
		else
		//if(sub<q)  
		{
			cout<<"NO"<<endl;     //因能量不够而掉入水中
			return 0;//结束程序 
		}
	}
	cout<<f[n+1]<<endl;    //最后能量 
	return 0;
}