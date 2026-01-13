'use client';

import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';
import { mainNavItems, bottomNavItems } from '@/constants/navItems.constant';
import { Bell, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  return (
    <Sidebar className="bg-gray-950 border-gray-800">
      <SidebarHeader className="p-6">
        <h2 className="text-2xl font-bold text-white">Metric Flow</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.path)}
                    isActive={activeTab === item.path}
                    className={`text-gray-300 hover:text-white hover:bg-gray-800 transition-colors ${
                      activeTab === item.path 
                        ? 'bg-orange-500/20 text-orange-400 border-r-2 border-orange-500' 
                        : ''
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.path)}
                    isActive={activeTab === item.path}
                    className={`text-gray-300 hover:text-white hover:bg-gray-800 transition-colors ${
                      activeTab === item.path 
                        ? 'bg-orange-500/20 text-orange-400 border-r-2 border-orange-500' 
                        : ''
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}

function TopHeader() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="flex items-center justify-between p-6 bg-gray-900 border-b border-gray-800">
      <div className="flex items-center space-x-4 flex-1">
        <h2 className="text-xl font-semibold text-white">Dashboard</h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-gray-300">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{currentDate}</span>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-semibold">U</span>
        </div>
      </div>
    </div>
  );
}

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-950">
      <SidebarProvider>
        <AppSidebar activeTab={activeTab} onTabChange={onTabChange} />
        <SidebarInset className="bg-gray-950">
          <TopHeader />
          <div className="flex-1 p-6">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}