import { PlayerProfile } from './player-profile'

describe('Player Profile Entity', () => {
  it('Should return all player profiles', () => {
    const sut = PlayerProfile.getPlayerProfiles()
    expect(sut).toEqual([
      {
        name: 'Exploração',
        description: 'Você gosta de conhecer o mundo em que está se aventurando, adora encontrar e explorar dungeons.'
      },
      {
        name: 'Matar e pilhar',
        description: 'Para você, a parte mais importante e divertida de uma partida é a hora de rolar dados e distribuir o dano entre seus inimigos.'
      },
      {
        name: 'Interpretação',
        description: 'Para você, a ficha e as regras são apenas uma parte do RPG, você gosta de sentir-se na pele de seu personagem.'
      }])
  })
})
