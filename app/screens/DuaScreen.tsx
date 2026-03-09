import React, { useState } from 'react';
import DuaList from '../components/duas/DuaList';
import DuaDetail from '../components/duas/DuaDetail';
import { Dua } from '../data/duas';

export default function DuaScreen() {
  const [selectedDua, setSelectedDua] = useState<Dua | null>(null);

  if (selectedDua) {
    return <DuaDetail dua={selectedDua} onBack={() => setSelectedDua(null)} />;
  }

  return <DuaList onSelectDua={setSelectedDua} />;
}
