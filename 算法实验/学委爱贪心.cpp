#include <iostream>
#include <vector>
#include <algorithm>
#include <math.h>
using namespace std;

int main()
{
  int t;
  cin >> t;
  int moneyList[7] = {1, 2, 5, 10, 20, 50, 100};
  for (int i = 0; i < t; i++)
  {
    double amountCount;
    cin >> amountCount;
    int number[7] = {0};
    for (int j = 0; j < 7; j++)
    {
      cin >> number[j];
    }

    int count = 0;
    for (int j = 6; j >= 0; j--)
    {
      int pick = 0;
      if (moneyList[j] * number[j] >= amountCount)
        pick = ceil(amountCount / moneyList[j]);
      else
        pick = number[j];
      amountCount -= pick * moneyList[j];
      count += pick;
      if (amountCount <= 0)
        break;
    }

    if (amountCount <= 0)
      printf("%d\n", count);
    else
      printf("xuewei,ni zhe chou diaosi\n");
  }

  return 0;
}