
#include <stdio.h>
#include <iostream>
#include <math.h>
#include <string.h>
 
using namespace std;
const double INF=10000000000000.00;
double map[105][105],dist[105];
int x[105],y[105],vis[105];
int c;
void getmap(int a){
	int i;
	double k;
	for(i=a+1;i<=c;i++){
		k=sqrt((x[a]-x[i])*(x[a]-x[i])+(y[a]-y[i])*(y[a]-y[i]));
		if(k<10.00||k>1000.00) {
		 map[a][i]=map[i][a]=INF;
		 //continue;
		}
		else map[a][i]=map[i][a]=k;	
	}
}
double prim(){
	int i,j;
	double sum=0.0;
	memset(vis,0,sizeof(vis));
	for(i=1;i<=c;i++) dist[i]=map[1][i];
	dist[1]=0.0;
	vis[1]=1;
	for(i=1;i<=c;i++){
		double minn=INF;
		int k=-1;
		for(j=1;j<=c;j++){
			if(dist[j]<=minn&&vis[j]==0){
				minn=dist[j];
				k=j;
			}
		}
		if(k==-1) break;
		//cout<<minn<<endl;
		//if(minn==INF)
		sum+=minn;
		vis[k]=1;
		for(j=1;j<=c;j++){
			if(dist[j]>map[k][j]&&vis[j]==0){
				dist[j]=map[k][j];
			}
		}
	}
	return sum;
}
int main(){
	int t;
	scanf("%d",&t);
	while(t--){
		scanf("%d",&c);
		int i;
		for(i=1;i<=c;i++){
			scanf("%d %d",&x[i],&y[i]);
		}
		for(i=1;i<=c;i++){
			getmap(i);
		}
		double sum=prim()*100.00;
		//printf("%.1f\n",sum);
		if(sum>=INF) printf("oh!\n");
		else printf("%.1f\n",sum);
	}
	return 0;
} 
