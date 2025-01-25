import React, { useState } from 'react';
import { 
  Boxes, ShoppingBag, Users, Truck, Bell,
  PackageOpen, PackagePlus, PackageSearch,
  BarChart, ClipboardList, AlertTriangle, 
  History, ArrowDownUp, Plus, Pencil, 
  ImagePlus, Tags, DollarSign, Eye, 
  Archive, Settings, Clock, CheckCircle,
  XCircle, Package, CreditCard, Printer,
  MessageCircle, Activity, Mail, FileWarning,
  Zap, DatabaseBackup, UserPlus, Search,
  Heart, MessageSquare, Shield, BarChart2,
  Tag, FileText
} from 'lucide-react';

interface CellProps {
  isActive?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  label?: string;
}

const Cell: React.FC<CellProps> = ({ isActive = false, onClick, icon, label }) => (
  <div
    onClick={onClick}
    className={`
      aspect-square
      border
      border-red-800
      transition-all
      duration-200
      cursor-pointer
      flex
      flex-col
      items-center
      justify-center
      gap-1
      p-2
      ${isActive ? 'bg-red-600' : 'bg-black hover:bg-zinc-900'}
    `}
  >
    {icon && <div className="text-gray-300">{icon}</div>}
    {label && <span className="text-xs text-gray-400 text-center">{label}</span>}
  </div>
);

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  startIndex: number;
  selectedCell: number | null;
  onCellClick: (index: number) => void;
  cells?: Array<{ icon: React.ReactNode; label: string }>;
}

const Section: React.FC<SectionProps> = ({ 
  title, icon, startIndex, selectedCell, onCellClick, cells 
}) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <div className="text-red-500">{icon}</div>
      <h2 className="text-white font-bold uppercase">{title}</h2>
    </div>
    <div className="grid grid-cols-3 gap-1">
      {cells ? cells.map((cell, i) => (
        <Cell 
          key={startIndex + i}
          isActive={selectedCell === startIndex + i}
          onClick={() => onCellClick(startIndex + i)}
          icon={cell.icon}
          label={cell.label}
        />
      )) : Array.from({ length: 9 }, (_, i) => (
        <Cell 
          key={startIndex + i}
          isActive={selectedCell === startIndex + i}
          onClick={() => onCellClick(startIndex + i)}
        />
      ))}
    </div>
  </div>
);

const SectionedGrid = () => {
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  const inventoryCells = [
    { icon: <PackageOpen size={20} />, label: "Current Stock" },
    { icon: <PackagePlus size={20} />, label: "Add Stock" },
    { icon: <PackageSearch size={20} />, label: "Search" },
    { icon: <BarChart size={20} />, label: "Analytics" },
    { icon: <ClipboardList size={20} />, label: "Audit" },
    { icon: <Truck size={20} />, label: "Receiving" },
    { icon: <AlertTriangle size={20} />, label: "Low Stock" },
    { icon: <History size={20} />, label: "History" },
    { icon: <ArrowDownUp size={20} />, label: "Adjust" }
  ];

  const productCells = [
    { icon: <ShoppingBag size={20} />, label: "All Products" },
    { icon: <Plus size={20} />, label: "Add New" },
    { icon: <Pencil size={20} />, label: "Edit" },
    { icon: <ImagePlus size={20} />, label: "Media" },
    { icon: <Tags size={20} />, label: "Categories" },
    { icon: <DollarSign size={20} />, label: "Pricing" },
    { icon: <Eye size={20} />, label: "Preview" },
    { icon: <Archive size={20} />, label: "Archive" },
    { icon: <Settings size={20} />, label: "Settings" }
  ];

  const orderCells = [
    { icon: <Package size={20} />, label: "New Orders" },
    { icon: <Clock size={20} />, label: "Pending" },
    { icon: <CheckCircle size={20} />, label: "Completed" },
    { icon: <CreditCard size={20} />, label: "Payments" },
    { icon: <Truck size={20} />, label: "Shipping" },
    { icon: <Printer size={20} />, label: "Labels" },
    { icon: <XCircle size={20} />, label: "Returns" },
    { icon: <MessageCircle size={20} />, label: "Support" },
    { icon: <Activity size={20} />, label: "Analytics" }
  ];

  const customerCells = [
    { icon: <Users size={20} />, label: "All Users" },
    { icon: <UserPlus size={20} />, label: "Add New" },
    { icon: <Search size={20} />, label: "Search" },
    { icon: <Heart size={20} />, label: "Loyalty" },
    { icon: <MessageSquare size={20} />, label: "Messages" },
    { icon: <Shield size={20} />, label: "Privacy" },
    { icon: <BarChart2 size={20} />, label: "Analytics" },
    { icon: <Tag size={20} />, label: "Segments" },
    { icon: <FileText size={20} />, label: "Reports" }
  ];

  const alertCells = [
    { icon: <AlertTriangle size={20} />, label: "Low Stock" },
    { icon: <FileWarning size={20} />, label: "Orders" },
    { icon: <Mail size={20} />, label: "Support" },
    { icon: <Clock size={20} />, label: "Pending" },
    { icon: <Zap size={20} />, label: "System" },
    { icon: <Activity size={20} />, label: "Traffic" },
    { icon: <DatabaseBackup size={20} />, label: "Backup" },
    { icon: <Bell size={20} />, label: "Other" }
  ];

  const sections = [
    { 
      title: 'Inventory', 
      icon: <Boxes size={24} />,
      cells: inventoryCells
    },
    { 
      title: 'Products', 
      icon: <ShoppingBag size={24} />,
      cells: productCells
    },
    {
      title: 'Orders',
      icon: <Truck size={24} />,
      cells: orderCells
    },
    {
      title: 'Customers',
      icon: <Users size={24} />,
      cells: customerCells
    }
  ];

  const renderHorizontalSection = (startIndex: number) => (
    <div className="relative">
      <div className="flex items-center gap-2 mb-2">
        <Bell className="text-red-500" size={24} />
        <h2 className="text-white font-bold uppercase">Priority Alerts</h2>
      </div>
      <div className="grid grid-cols-8 gap-1">
        {alertCells.map((cell, i) => (
          <Cell 
            key={startIndex + i}
            isActive={selectedCell === startIndex + i}
            onClick={() => setSelectedCell(startIndex + i)}
            icon={cell.icon}
            label={cell.label}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-zinc-900">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-red-500 tracking-tight">STOLEN STREET</h1>
        <p className="text-gray-400 mt-1">Admin Priority Grid</p>
      </div>

      <div className="space-y-6 bg-red-900/20 p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-16">
          <Section {...sections[0]} startIndex={0} selectedCell={selectedCell} onCellClick={setSelectedCell} />
          <Section {...sections[1]} startIndex={9} selectedCell={selectedCell} onCellClick={setSelectedCell} />
        </div>

        <div className="py-2">
          {renderHorizontalSection(18)}
        </div>

        <div className="grid grid-cols-2 gap-16">
          <Section {...sections[2]} startIndex={26} selectedCell={selectedCell} onCellClick={setSelectedCell} />
          <Section {...sections[3]} startIndex={35} selectedCell={selectedCell} onCellClick={setSelectedCell} />
        </div>
      </div>

      <div className="mt-4 text-gray-400 font-mono">
        {selectedCell !== null && (
          <p>Selected: Cell {selectedCell + 1}</p>
        )}
      </div>
    </div>
  );
};

export default SectionedGrid;