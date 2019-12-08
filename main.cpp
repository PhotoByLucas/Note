#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int maxNumber = 100 + 10;
const int INF = 1e9 + 7;
double Map[maxNumber][maxNumber];
double lowcost[maxNumber];
int mst[maxNumber];
int n, m;
double prim(int u)
{
	double ans = 0;
	for (int i = 1; i <= n; i++)
	{
		lowcost[i] = Map[u][i];
		mst[i] = u;
	}
	mst[u] = -1;
	for (int i = 1; i < n; i++)
	{
		double minn = INF - 1;
		int v = -1;
		//寻找lowcost数组里面的未加入mst的最小值
		for (int j = 1; j <= n; j++)
		{
			if (mst[j] != -1 && lowcost[j] < minn)
			{
				v = j;
				minn = lowcost[j];
			}
		}
		if (v != -1)
		{
			mst[v] = -1;
			ans += lowcost[v];
			for (int j = 1; j <= n; j++)
			{
				if (mst[j] != -1 && lowcost[j] > Map[v][j])
				{
					lowcost[j] = Map[v][j];
					mst[j] = v;
				}
			}
		}
		else
			return -1.0; //没有找到，说明不连通
	}
	return ans;
}
struct node
{
	int x, y;
} a[maxNumber];
double dis(node a, node b)
{
	return sqrt(1.0 * (a.x - b.x) * (a.x - b.x) + 1.0 * (a.y - b.y) * (a.y - b.y));
}
int main()
{
	int T;
	scanf("%d", &T);
	while (T--)
	{
		scanf("%d", &n);
		for (int i = 1; i <= n; i++)
			for (int j = 1; j <= n; j++)
				Map[i][j] = INF * 1.0;
		memset(lowcost, 0, sizeof(lowcost));
		for (int i = 1; i <= n; i++)
		{
			scanf("%d%d", &a[i].x, &a[i].y);
		}
		for (int i = 1; i <= n; i++)
		{
			for (int j = i + 1; j <= n; j++)
			{
				double d = dis(a[i], a[j]);
				if (d < 10 || d > 1000)
					continue;
				Map[i][j] = Map[j][i] = d;
			}
		}
		double ans = prim(1);
		if (ans > 0)
			printf("%.1f\n", ans * 100);
		else
			printf("oh!\n");
	}
	return 0;
}