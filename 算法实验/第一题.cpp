#include <iostream>
using namespace std;

int main()
{
  int number;
  int sizeNumber;
  int element;
  int a[100];
  cin >> number;
  for (int t = 1; t <= number; t++)
  {
    cin >> sizeNumber;
    for (int m = 0; m < 100; m++)
    {
      a[m] = 0;
    } //初始化
    for (int i = 0; i < sizeNumber; i++)
    {
      cin >> a[i];
    }
    cin >> element;
    if (a[sizeNumber - 1] <= element)
    {
      a[sizeNumber] = element;
    }
    for (int n = sizeNumber - 1; n >= 0; n--)
    {
      if (a[n] > element)
      {
        a[n + 1] = a[n];
        a[n] = element;
      }
    }

    for (int b = 0; b <= sizeNumber - 1; b++)
    {
      cout << a[b] << " ";
    }
    cout << a[sizeNumber] << endl;
  }
}