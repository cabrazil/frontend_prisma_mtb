import React from 'react';
import { CreditCard } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import CardDetailSection from './CardDetailSection';

// Interfaces
interface CardProps {
  cardDetail: {
    id:               string;
    account_holder:   boolean;
    add_cards_amount: number;
    obs_add_cards:    string;
    add_cards_charge: number;
    card_limit:       string;
    get_conditions:   string[];
    zerofees?: {
      id: string;
      notes: string | null;
    };
  }
}

interface CardFeatureProps {
  label: string;
  value: string | number | boolean;
  icon?: boolean;
  className?: string;
}

const CardFeature: React.FC<CardFeatureProps> = ({ 
  label, 
  value, 
  icon = false, 
  className = ''
}) => (
  <div className={`flex justify-between ${className}`}>
    <div className="flex">
      {icon && (
        <span className={typeof value === 'boolean' && value ? 'text-green-500' : 'text-yellow-500'}>
          <FaCheck />
        </span>
      )}
      <span>{label}</span>
    </div>
    <div>
      <span className="text-gray-950 font-semibold">
        {typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : value}
      </span>
    </div>
  </div>
);

export const CardRequirements: React.FC<CardProps> = ({ cardDetail }) => {
  const COLORS = {
    PRIMARY: '#1F3B4D',
    TEXT_PRIMARY: '#4b5563',
  };

  return (
    <CardDetailSection
      title="Para obter o Cartão"
      icon={<CreditCard color={COLORS.PRIMARY} />}
      className='text-md font-semibold'
    >
      <div style={{ color: COLORS.TEXT_PRIMARY }}>
        <CardFeature 
          label="Somente correntistas:"
          value={cardDetail.account_holder}
          icon
        />
        
        {/* Condições - Agora com verificação adicional */}
        {cardDetail.get_conditions && cardDetail.get_conditions.length > 0 && (
          <div className='flex justify-between'>
            <div>
              <span className="ml-4">Precisa de:</span>
            </div>
            <div>            
              <ul className='text-gray-950 font-semibold'>
                {cardDetail.get_conditions.map((item, index) => (
                  <li key={index} className='ml-4 text-right'>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Nota - Vem de Zerofee notes */}
        {cardDetail.zerofees?.notes && cardDetail.zerofees.notes.length > 0 && (
          <CardFeature 
            label="Nota:"
            value={cardDetail.zerofees.notes}
            icon
          />
        )}

        {/* Cartões Adicionais */}
        <div className='flex justify-between'>
          {cardDetail.add_cards_amount === 0
            ? <span></span>
            : cardDetail.add_cards_amount >= 4
              ?
              <>
                <div className='flex'>
                  <span className='text-green-500'><FaCheck /></span>
                  <span>Cartões adicionais: </span>
                </div>
                <div>
                  <span className="text-gray-950 font-semibold">Até {cardDetail.add_cards_amount}</span>
                </div>
              </>
              :
              <>
                <div className='flex'>
                  <span className='text-yellow-500'><FaCheck /></span>
                  <span>Cartões adicionais: </span>
                </div>
                <div>
                  <span className="text-gray-950 font-semibold">Até {cardDetail.add_cards_amount}</span>
                </div>
              </>
          }
        </div>

        {/* Obs Correntistas - Com verificação */}
        {cardDetail?.obs_add_cards && (
          <CardFeature 
            label="Obs:"
            value={cardDetail.obs_add_cards}
            icon
          />
        )}

        {/* Valor mínimo por fatura */}
        {cardDetail.add_cards_charge > 0 && (
          <div className='flex justify-between'>
            <div>
              <span className="ml-4">Valor mínimo de fatura por adicional: </span>
            </div>
            <div>
              <span className="text-gray-950 font-semibold">{cardDetail.add_cards_charge}</span>
            </div>
          </div>
        )}

        <CardFeature 
          label="Limite do cartão:"
          value={cardDetail.card_limit}
          icon
        />
      </div>
    </CardDetailSection>
  );
};

export default CardRequirements;