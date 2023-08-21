<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class WeaponEditRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $mount_pos_validate = function($attribute, $value, $fail)
        {
            $input = $this->all();
            if (!($input['can_mount_head'] === 1
               || $input['can_mount_hand'] === 1
               || $input['can_mount_arm'] === 1
               || $input['can_mount_shoulder'] === 1
               || $input['can_mount_torso'] === 1
               || $input['can_mount_leg'] === 1 ))
            {
               $fail('装備位置は1つ以上選択してください。');
            }
        };

        return [
            'weapon_name' => ['required', 'string', 'max:200'],
            'user_id' => ['required', 'integer'],
            'power_impact' => ['required', 'integer', 'between:0,99'],
            'power_penetrate' => ['required', 'integer', 'between:0,99'],
            'power_heat' => ['required', 'integer', 'between:0,99'],
            'ammo_type' => ['required', 'integer', 'in:0,1'],
            'ammo_count' => ['required', 'integer', 'between:0,99'],
            'hit_rate' => ['required', 'integer', 'between:0,99'],
            'attack_type' => ['required', 'integer', 'in:0,1,2'],
            'min_range' => ['required', 'integer', 'between:1,200'],
            'max_range' => ['required', 'integer', 'between:1,200', 'gte:min_range'],
            'stabilizer_weight' => ['required', 'integer', 'min:0'],
            'parry_rate' => ['required', 'integer', 'between:0,99'],
            'can_mount_head' => ['required', 'integer', 'in:0,1'],
            'can_mount_hand' => ['required', 'integer', 'in:0,1'],
            'can_mount_arm' => ['required', 'integer', 'in:0,1'],
            'can_mount_shoulder' => ['required', 'integer', 'in:0,1'],
            'can_mount_torso' => ['required', 'integer', 'in:0,1'],
            'can_mount_leg' => ['required', 'integer', 'in:0,1', $mount_pos_validate],
            'description' => ['nullable', 'string', 'max:200'],
        ];
    }
}
