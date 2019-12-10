#include <iostream>
#include <algorithm>
#include <string>
#include <vector>
#include <set>
#include <queue>
#include <map>
#include <stack>
#include <iterator>
#include <cstdio>
#include <cstring>
#include <cstdlib>
#include <cmath>
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
#define clr(c) memset(c, 0, sizeof(c));
#define pi acos(-1.0)
const int INF = 0x3f3f3f3f;
const int mod = 1e9 + 7;
const double eps = 1e-8;
typedef struct point
{
  int x, y;
  bool operator<(const point &p) const
  {
    if (x == p.x)
      return y < p.y;
    else
      return x < p.x;
  }
  bool operator>(const point &p) const
  {
    return p < *this;
  }
} p;
int x, y;
int n;
p arr[1005];
int dp[1005];

int main()
{
  int temp = 0;
  while (~scanf("%d%d", &x, &y))
  {
    if (x == 0 && y == 0)
      break;
    scanf("%d", &n);
    for (int i = 0; i < n; i++)
    {
      int a, b;
      scanf("%d%d", &a, &b);
      arr[i].x = a, arr[i].y = b;
    }
    sort(arr, arr + n);
    for (int i = 0; i < n; i++)
      dp[i] = 1;
    int ans = 0;
    for (int i = 0; i < n; i++)
    {
      for (int j = 0; j < i; j++)
      {
        if (arr[i].y > arr[j].y && dp[j] + 1 > dp[i])
          dp[i] = dp[j] + 1;
      }
      if (dp[i] > ans)
        ans = dp[i];
    }
    temp += ans;
  }
  printf("%d", temp);

  return 0;
}