<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('field_validations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('field_id')->on('form_fields')->onDelete('cascade');
            $table->string('validation_name',100);
            $table->string('validation_rule',100);
            $table->text('info');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('field_validations');
    }
};
