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
        Schema::create('validation_rules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('field_id'); 
            $table->string('validation_name',100);
            $table->softDeletes();
            $table->timestamps();
            $table->foreign('field_id')->references('id')->on('form_fields')->onDelete('cascade');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('validation_rules');
    }
};
