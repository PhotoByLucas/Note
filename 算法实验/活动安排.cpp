#include <iostream>
#include <stdlib.h>
#include <algorithm>
#include <math.h>
#include <string.h>
using namespace std;

struct action
{
  int s;
  int f;
  int index;
};

bool cmp(const action &a, const action &b)
{
  if (a.f <= b.f)
    return true;
  return false;
}

void GreedySelector(int n, action a[], bool b[])
{
  b[1] = true;
  int preEnd = 1;
  for (int i = 2; i <= n; i++)
    if (a[i].s >= a[preEnd].f)
    {
      b[i] = true;
      preEnd = i;
    }
}

int main()
{
  int n;
  int count = 0;
  while (cin >> n && n)
  {
    action a[1000];
    bool b[1000];
    memset(b, false, sizeof(b));
    for (int i = 1; i <= n; i++)
    {
      cin >> a[i].s >> a[i].f;
      a[i].index = i;
    }
    sort(a, a + n + 1, cmp);
    GreedySelector(n, a, b);
    for (int i = 1; i <= n; i++)
      if (b[i])
      {
        count++;
      }
  }
  cout<<count;
  return 0;
}