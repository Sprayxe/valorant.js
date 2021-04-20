export interface IItemUpgrades {
    Definitions: IItemUpgradeOffer[]
}

export interface IItemUpgradeOffer {
    ID: string
    Item: IItemUpgradeInfo
    RequiredEntitlement: IItemUpgradeInfo
    ProgressionSchedule: IItemUpgradeProgression
    RewardSchedule: IItemUpgradeReward
    Sidegrades?: any
}

export interface IItemUpgradeInfo {
    ItemTypeID: string
    ItemID: string
}

export interface IItemUpgradeProgression {
    Name: string
    ProgressionCurrencyID: string
    ProgressionDeltaPerLevel: number[]
    RewardsPerLevel: IItemUpgradeReward[]
}

export interface IItemUpgradeReward {
    ID: string
    Name: string
    Prerequisites?: any
    RewardsPerLevel: IItemUpgradeLevelReward[]
}

export interface IItemUpgradeLevelReward {
    EntitlementRewards: IItemUpgradeLevelEntitlement[]
    WalletRewards?: any
    CounterRewards?: any
}

export interface IItemUpgradeLevelEntitlement {
    ItemTypeID: string
    ItemID: string
    Amount: number
}

