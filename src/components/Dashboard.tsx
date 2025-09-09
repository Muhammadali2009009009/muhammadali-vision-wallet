import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Send, 
  Download, 
  CreditCard,
  BarChart3,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  const quickActions = [
    { icon: Send, label: t('sendMoney'), color: 'text-primary', bg: 'bg-primary/10' },
    { icon: Download, label: t('receiveMoney'), color: 'text-accent', bg: 'bg-accent/10' },
    { icon: CreditCard, label: t('payBills'), color: 'text-secondary', bg: 'bg-secondary/10' },
    { icon: BarChart3, label: t('analytics'), color: 'text-warning', bg: 'bg-warning/10' },
  ];

  const recentTransactions = [
    { id: 1, type: 'receive', amount: '+$12,500', desc: 'Salary Payment', time: '2h ago' },
    { id: 2, type: 'send', amount: '-$850', desc: 'Rent Payment', time: '5h ago' },
    { id: 3, type: 'receive', amount: '+$2,300', desc: 'Freelance Work', time: '1d ago' },
    { id: 4, type: 'send', amount: '-$450', desc: 'Groceries', time: '2d ago' },
  ];

  return (
    <div className="p-6 space-y-8 animate-slide-up">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-orbitron font-bold gradient-text mb-2">
          Welcome Back, Muhammadali
        </h1>
        <p className="text-muted-foreground">
          Here's your financial overview
        </p>
      </div>

      {/* Balance Card */}
      <Card className="card-glass neon-glow animate-scale-in">
        <CardContent className="p-8 text-center">
          <div className="mb-4">
            <p className="text-muted-foreground text-lg mb-2">{t('totalBalance')}</p>
            <div className="balance-display">
              271,018,028.00 $
            </div>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 text-accent">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5%</span>
            </div>
            <div className="text-muted-foreground">
              vs last month
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-xl font-semibold mb-4 neon-text">{t('quickActions')}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                className="h-20 flex flex-col items-center justify-center space-y-2 card-glass hover:neon-glow transition-all duration-300"
              >
                <div className={`p-2 rounded-lg ${action.bg}`}>
                  <IconComponent className={`w-6 h-6 ${action.color}`} />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <Card className="card-glass">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-orbitron font-bold text-accent">$45,231.89</div>
            <p className="text-xs text-accent flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-orbitron font-bold text-danger">$12,431.26</div>
            <p className="text-xs text-danger flex items-center mt-1">
              <TrendingDown className="w-3 h-3 mr-1" />
              -4.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="card-glass">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-orbitron font-bold text-primary">$32,800.63</div>
            <p className="text-xs text-primary flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15.7% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-xl font-semibold mb-4 neon-text">{t('recentTransactions')}</h2>
        <Card className="card-glass">
          <CardContent className="p-0">
            {recentTransactions.map((transaction, index) => (
              <div 
                key={transaction.id} 
                className={`flex items-center justify-between p-4 ${
                  index !== recentTransactions.length - 1 ? 'border-b border-border/10' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    transaction.type === 'receive' ? 'bg-accent/10' : 'bg-danger/10'
                  }`}>
                    {transaction.type === 'receive' ? (
                      <ArrowDownLeft className={`w-4 h-4 ${
                        transaction.type === 'receive' ? 'text-accent' : 'text-danger'
                      }`} />
                    ) : (
                      <ArrowUpRight className={`w-4 h-4 ${
                        transaction.type === 'receive' ? 'text-accent' : 'text-danger'
                      }`} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.desc}</p>
                    <p className="text-sm text-muted-foreground">{transaction.time}</p>
                  </div>
                </div>
                <div className={`font-orbitron font-bold ${
                  transaction.type === 'receive' ? 'text-accent' : 'text-danger'
                }`}>
                  {transaction.amount}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;