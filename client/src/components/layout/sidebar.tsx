import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Plane, 
  Calculator,
  Settings
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Fleet", href: "/fleet", icon: Plane },
  { name: "Calculator", href: "/calculator", icon: Calculator },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="flex min-h-0 flex-col bg-[#003366] w-64">
      <div className="flex h-16 shrink-0 items-center px-6">
        <h1 className="text-xl font-bold text-white">Airline Manager</h1>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <a
                      className={cn(
                        location === item.href
                          ? "bg-[#009CDC] text-white"
                          : "text-gray-300 hover:bg-[#004480] hover:text-white",
                        "group flex gap-x-3 rounded-md p-2 mx-2 text-sm font-semibold leading-6"
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0" />
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
