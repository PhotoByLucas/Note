#include <cstdio>
#include <cstring>
#include <algorithm>
#include <iostream>
#include <queue>
using namespace std;
const int maxn = 100001;
const int inf = 1e9;

int n, m, r[maxn], c[maxn];
struct Edge
{
    int next, to, dis;
} edge[maxn << 1];
int num_edge = -1, maxflow, head[maxn], cur[maxn], deep[maxn];

void add_edge(int from, int to, int dis)
{
    edge[++num_edge].next = head[from];
    edge[num_edge].dis = dis;
    edge[num_edge].to = to;
    head[from] = num_edge;
}
void add(int x, int y, int z)
{
    add_edge(x, y, z);
    add_edge(y, x, 0);
}
queue<int> q;
bool bfs(int s, int t)
{
    memset(deep, 0x7f, sizeof(deep));
    while (!q.empty())
        q.pop();
    for (int i = 0; i <= t; i++)
        cur[i] = head[i];
    q.push(s);
    deep[s] = 0;
    while (!q.empty())
    {
        int now = q.front();
        q.pop();
        for (int i = head[now]; i != -1; i = edge[i].next)
        {
            int to = edge[i].to;
            if (deep[to] > inf && edge[i].dis)
            {
                deep[to] = deep[now] + 1;
                q.push(to);
            }
        }
    }
    return deep[t] < inf;
}

int dfs(int now, int t, int limit)
{
    if (now == t || !limit)
        return limit;
    int flow = 0, f;
    for (int i = cur[now]; i != -1; i = edge[i].next)
    {
        cur[now] = i;
        int to = edge[i].to;
        if (deep[to] == deep[now] + 1 && (f = dfs(to, t, min(edge[i].dis, limit))))
        {
            flow += f;
            limit -= f;
            edge[i].dis -= f;
            edge[i ^ 1].dis += f;
            if (!limit)
                break;
        }
    }
    return flow;
}

void Dinic(int s, int t)
{
    while (bfs(s, t))
        maxflow += dfs(s, t, inf);
}

int main()
{
    memset(head, -1, sizeof(head));
    scanf("%d%d", &m, &n);
    int S = 0, T = n + m + 1;
    int sum = 0;
    for (int i = 1; i <= m; i++)
    {
        scanf("%d", &r[i]);
        add(S, i, r[i]);
        sum += r[i];
    }
    for (int i = 1; i <= n; i++)
    {
        scanf("%d", &c[i]);
        add(i + m, T, c[i]);
    }
    for (int i = 1; i <= m; i++)
        for (int j = m + 1; j <= n + m; j++)
            add(i, j, 1);
    Dinic(S, T);
    if (maxflow == sum)
        printf("1\n");
    else
    {
        printf("0");
        return 0;
    }
    for (int i = 2 * (n + m); i <= num_edge; i += n * 2)
    {
        for (int j = 0; j < n * 2; j += 2)
        {
            if (!edge[i + j].dis)
            {
                if (j + 2 < n * 2)
                {
                    printf("%d ", edge[i + j].to - m);
                }
                else
                {
                    printf("%d", edge[i + j].to - m);
                }
            }
        }
        printf("\n");
    }
    return 0;
}
