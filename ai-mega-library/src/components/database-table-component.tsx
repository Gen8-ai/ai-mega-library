import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';

interface Column {
  name: string;
  type: string;
  nullable: boolean;
  default?: string;
  constraints?: string[];
}

interface TableSchema {
  name: string;
  columns: Column[];
}

const DatabaseTableView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const tables: TableSchema[] = [
    {
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          nullable: false,
          default: 'gen_random_uuid()',
          constraints: ['NOT NULL']
        },
        {
          name: 'username',
          type: 'text',
          nullable: false,
          constraints: ['NOT NULL']
        },
        {
          name: 'email',
          type: 'text',
          nullable: false,
          constraints: ['NOT NULL']
        },
        {
          name: 'role',
          type: 'text',
          nullable: false,
          default: "'user'::text",
          constraints: ['NOT NULL']
        }
      ]
    },
    // Add more tables as needed
  ];

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Database Schema</span>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search tables..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {filteredTables.map((table) => (
          <div key={table.name} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{table.name}</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-48 cursor-pointer" onClick={() => handleSort('name')}>
                    <div className="flex items-center">
                      Column Name
                      <SortIcon field="name" />
                    </div>
                  </TableHead>
                  <TableHead className="w-32">Type</TableHead>
                  <TableHead className="w-32">Nullable</TableHead>
                  <TableHead>Constraints</TableHead>
                  <TableHead>Default</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {table.columns.map((column) => (
                  <TableRow key={column.name}>
                    <TableCell className="font-medium">{column.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{column.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={column.nullable ? "outline" : "destructive"}>
                        {column.nullable ? 'NULL' : 'NOT NULL'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {column.constraints?.map((constraint, idx) => (
                          <Badge key={idx} variant="outline">{constraint}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {column.default && (
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {column.default}
                        </code>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DatabaseTableView;
