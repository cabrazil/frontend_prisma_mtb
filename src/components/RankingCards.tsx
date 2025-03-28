import { useEffect, useState } from "react";
import { api } from "../services/api";
import {Award, Globe, DollarSign } from 'lucide-react';
 
const COLORS = {
  PRIMARY: '#1F3B4D',      // Azul-marinho profundo
  SECUNDARY: '#d1d5db',    // Cinza-300
  HIGHLIGHT: '#FFD700',    // Dourado
  BACKGROUND: '#F5F5F5',   // Cinza-claro
  TEXT_PRIMARY: '#333333', // Cinza-escuro
  TEXT_SECONDARY: '#666666' // Cinza-médio
};

interface CardProps{
  id: string;
  created_at:            string;
  updated_at:            string;
  card_name:             string;
  issuer_name:           string;
  annual_fee:            number;
  card_brand:            string;
  category:              string;
  card_limit:            string;
  ranking_points:        number;
  ranking_benefits:      number;
  ranking_annuity:       number;
  ranking_miles_program: number;
  virtual_wallets:       string[];
  add_cards_amount:      number;
  add_cards_charge:      number;
  card_material:         string;
  contactless:           boolean;
  get_conditions:        string[];
  spread_on:             string;
  cashback:              string;
  obs_add_cards:         string;
  obs_cashback:          string;
  account_holder:        boolean;
  international_card:    boolean;
  card_modality:         string;
  vip_lounge_app:        string;
  spread_rate:           number;
  iof_rate:              number;
  ranking_vip_lounges:   number;
  src_card_picture:      string;
  brandId:               string;
  issuerId:              string;
}

const RANKING_CATEGORIES = [
  { 
    id: 'milhas', 
    label: 'Melhores em Milhas', 
    icon: <Award color={COLORS.PRIMARY} />
  },
  { 
    id: 'salas-vip', 
    label: 'Acesso Salas VIP', 
    icon: <Globe color={COLORS.PRIMARY} />
  },
  { 
    id: 'cashback', 
    label: 'Melhores Cashback', 
    icon: <DollarSign color={COLORS.PRIMARY} />
  }
];

export function RankingCards() {
  const [creditCards, setCreditCards] = useState<CardProps[]>([]);
    
  useEffect(() => {
    loadCards();
  }, [])

  async function loadCards() {
    const response = await api.get("/cards")
    setCreditCards(response.data);
  }

  return (
    <div className="credit-card-ranking">
      {/* <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.TEXT_PRIMARY }}>
        Ranking de Cartões de Crédito
      </h2>

      <div className="ranking-categories flex space-x-4 mb-6">
          {RANKING_CATEGORIES.map(category => (
            <button 
              key={category.id}
              //onClick={() => handleRankingCategorySelect(category.id)}
              className={`
                flex items-center justify-center 
                px-4 py-2 rounded-md 
                transition-all duration-300 
              `}
              style={{ 
                backgroundColor: COLORS.HIGHLIGHT, 
                color: COLORS.TEXT_PRIMARY 
              }}
            >
              {category.icon}
              <span className="ml-2">{category.label}</span>
            </button>
          ))}
        </div> */}

      <div className="credit-cards grid md:grid-cols-3 gap-4">
        {creditCards.map(card => (
          <div 
            key={card.id} 
            className="credit-card-card p-4 rounded-lg shadow-md"
            style={{ 
              backgroundColor: 'white', 
              borderColor: COLORS.HIGHLIGHT 
            }}
          >
            <h3 className="text-lg font-semibold" style={{ color: COLORS.TEXT_PRIMARY }}>
              {card.card_name}
            </h3>
            <p style={{ color: COLORS.TEXT_SECONDARY }}>
              Instituição: {card.issuer_name}
            </p>
            {/* Detalhes adicionais do cartão */}
          </div>
        ))}
        </div>
      </div>
    );
  };